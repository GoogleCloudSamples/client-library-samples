import os
import json
import glob
import sys
import re
from collections import defaultdict

EXTENSION_MAP = {
    "NODEJS": ".js",
    "PYTHON": ".py",
    "JAVA": ".java",
    "GO": ".go",
    "CSHARP": ".cs",
    "PHP": ".php",
    "RUBY": ".rb",
}

IGNORED_TAGS = {"app_yaml"}


def find_specs(root_dir):
    return glob.glob(
        os.path.join(root_dir, "**", ".samples", "*.spec.json"), recursive=True
    )


def derive_versionless_tag(tag_name):
    """
    Removes the service version component (e.g., _v1_, _v2beta1_) from the tag.
    Example: 'api_v1_method' -> 'api_method'
    """

    pattern = r"(_v\d+[a-zA-Z0-9]*_)"

    if re.search(pattern, tag_name):
        return re.sub(pattern, "_", tag_name)
    return None


def build_global_tag_index(root_dir):
    print("Indexing repository tags... ")
    tag_index = defaultdict(list)
    tag_pattern = re.compile(r"\[START\s+([a-zA-Z0-9_\-]+)\]")

    for current_root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if not d.startswith(".")]

        for file in files:
            _, ext = os.path.splitext(file)
            if ext not in EXTENSION_MAP.values():
                continue

            filepath = os.path.join(current_root, file)
            abs_path = os.path.abspath(filepath)

            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    found_tags = tag_pattern.findall(content)
                    for tag in found_tags:
                        tag_index[tag].append(abs_path)
            except Exception as e:
                print(f"Warning: Could not read {filepath}: {e}")

    return tag_index


def validate(repo_root):
    abs_root = os.path.abspath(repo_root)
    print(f"Scanning repository at: {abs_root}")

    # 1. Build Global Index of Code
    tag_index = build_global_tag_index(abs_root)

    # Track tags claimed by specs
    claimed_tags_in_code = set()

    # 2. Process Specs
    specs = find_specs(abs_root)
    print(f"Found {len(specs)} spec files. Validating sample instances...")

    errors = []
    warnings = []

    for spec_path in specs:
        try:
            with open(spec_path, "r") as f:
                data = json.load(f)
        except json.JSONDecodeError as e:
            errors.append(f"Invalid JSON in {spec_path}: {e}")
            continue

        samples_dir = os.path.dirname(spec_path)
        service_dir = os.path.abspath(os.path.dirname(samples_dir))

        spec_tags = [t.get("name") for t in data.get("regionTags", []) if t.get("name")]

        if not spec_tags:
            print(f"Warning: No region tags in {spec_path}")
            continue

        allowed_tags_for_this_spec = set(spec_tags)

        for tag in spec_tags:
            v_less = derive_versionless_tag(tag)
            if v_less:
                allowed_tags_for_this_spec.add(v_less)

                if v_less not in spec_tags and v_less in tag_index:
                    warnings.append(
                        f"Spec missing versionless definition: '{v_less}' (found in code, implied by '{tag}') in {os.path.basename(spec_path)}"
                    )

        instances = data.get("instances", [])

        # Check Spec -> Code ---
        for instance in instances:
            lang = instance.get("categories", {}).get("language")
            if not lang or lang not in EXTENSION_MAP:
                continue

            required_ext = EXTENSION_MAP[lang]
            instance_satisfied = False

            # Check if ANY of the allowed tags (Versioned OR Versionless) exist for this language
            for tag in allowed_tags_for_this_spec:
                files_with_tag = tag_index.get(tag, [])

                for file_path in files_with_tag:
                    if file_path.endswith(required_ext) and file_path.startswith(
                        service_dir
                    ):
                        instance_satisfied = True
                        claimed_tags_in_code.add((tag, file_path))

            if not instance_satisfied:
                tags_str = " OR ".join(spec_tags)
                errors.append(
                    f"MISSING INSTANCE: Spec expects '{lang}' for tag '{tags_str}'\n    - Spec: {spec_path}"
                )

    # Check for Orphaned Samples
    orphans = []

    for tag, file_paths in tag_index.items():
        if tag in IGNORED_TAGS:
            continue

        for file_path in file_paths:
            if (tag, file_path) not in claimed_tags_in_code:
                rel_path = os.path.relpath(file_path, abs_root)
                orphans.append(f"Tag '{tag}' in {rel_path}")

    if errors or orphans:
        print("\n" + "!" * 60)
        print("AUDIT FAILURE REPORT")
        print("!" * 60)

        if errors:
            print(f"\n[MISSING SAMPLES] ({len(errors)} errors):")
            for e in errors:
                print(f"  * {e}")

        if orphans:
            print(f"\n[ORPHANED SAMPLE CODE] ({len(orphans)} errors):")
            for o in sorted(orphans):
                print(f"  * {o}")

        if warnings:
            print(f"\n[COMPLIANCE WARNINGS] ({len(warnings)}):")
            print("These versionless tags were found in code and matched to specs,")
            print(
                "but are missing from the .spec.json 'regionTags' array (see versionless-region-tags sample standards)."
            )
            for w in warnings[:10]:
                print(f"  * {w}")
            if len(warnings) > 10:
                print(f"  * ... and {len(warnings)-10} more.")

        sys.exit(1)
    else:
        print("\nSUCCESS: Repository is clean.")
        if warnings:
            print(
                f"(Note: {len(warnings)} specs need updates to explicitly include versionless tags)"
            )


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    validate(path)
