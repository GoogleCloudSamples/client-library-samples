# Sample Tools (`sampletools/`)

This directory contains repository tooling, validators, documentation generators, shared libraries, and linter plugins for maintaining code samples and `.samples/*.spec.json` manifests across `client-library-samples`.

## Table of Contents

- [When to Use These Tools](#when-to-use-these-tools)
- [Directory Structure](#directory-structure)
- [1. Language README Generator (`generators/generate_language_readmes.js`)](#1-language-readme-generator-generatorsgenerate_language_readmesjs)
  - [When to Run](#when-to-run)
  - [Usage & CLI Flags](#usage--cli-flags)
  - [Adding a New Product or Language](#adding-a-new-product-or-language)
  - [Running the Unit Tests](#running-the-unit-tests)
- [2. Sample Spec Validator (`validators/audit_sample_specs.py`)](#2-sample-spec-validator-validatorsaudit_sample_specspy)
  - [When to Run](#when-to-run-1)
  - [Usage](#usage)
- [3. Shared Node.js Libraries (`lib/`)](#3-shared-nodejs-libraries-lib)
- [4. ESLint Sample Style Plugin (`eslint-sample-style/`)](#4-eslint-sample-style-plugin-eslint-sample-style)

---

## When to Use These Tools

| Scenario | Tool(s) to Run | Command (from repository root) |
| :--- | :--- | :--- |
| **Adding, renaming, or removing a code sample** | Spec Validator + README Generator | `python3 sampletools/validators/audit_sample_specs.py .`<br>`node sampletools/generators/generate_language_readmes.js` |
| **Updating a sample's title, description, or `instances` in `.samples/*.spec.json`** | Spec Validator + README Generator | `python3 sampletools/validators/audit_sample_specs.py .`<br>`node sampletools/generators/generate_language_readmes.js` |
| **Updating `[START <tag>]` / `[END <tag>]` region tags in source files** | Spec Validator | `python3 sampletools/validators/audit_sample_specs.py .` |
| **Adding a new Google Cloud product directory or language** | Edit [`generators/language_readme_config.json`](generators/language_readme_config.json), then run README Generator | `node sampletools/generators/generate_language_readmes.js` |
| **Pre-PR / CI verification (ensuring `docs/*.md` are up to date)** | README Generator (`--check` mode) | `node sampletools/generators/generate_language_readmes.js --check` |
| **Modifying generator or library code under `sampletools/`** | Generator Unit Test Suite | `node sampletools/generators/generate_language_readmes.test.js` |

---

## Directory Structure

```text
sampletools/
├── README.md
├── eslint-sample-style/
│   ├── index.js                         # Custom ESLint plugin for Node.js code samples
│   └── no-tabs-in-strings.js            # Disallows literal tab characters inside string literals
├── generators/
│   ├── generate_language_readmes.js     # Zero-dependency Node.js CLI to generate/check docs/<LANGUAGE>.md
│   ├── generate_language_readmes.test.js# Unit and E2E test suite (built-in node:test)
│   ├── language_readme_config.json      # Product display names and language metadata configuration
│   └── render_language_readme.js        # Markdown table formatting and landing page template renderer
├── lib/
│   ├── catalog_config.js                # Product and language taxonomy lookup helpers
│   ├── region_tags.js                   # Region tag regex helpers and concurrent streaming tag indexer
│   └── sample_specs.js                  # .samples/*.spec.json discovery and sample file resolver
└── validators/
    └── audit_sample_specs.py            # Audits 1:1 bidirectional mapping between specs and sample files
```

---

## 1. Language README Generator (`generators/generate_language_readmes.js`)

[`generate_language_readmes.js`](generators/generate_language_readmes.js) is a zero-dependency Node.js CLI tool (requiring Node.js 18+) that generates the language ecosystem landing pages in [`docs/`](../docs/):

- [`docs/JAVA.md`](../docs/JAVA.md)
- [`docs/JAVASCRIPT.md`](../docs/JAVASCRIPT.md)
- [`docs/KOTLIN.md`](../docs/KOTLIN.md)
- [`docs/PYTHON.md`](../docs/PYTHON.md)

The generator scans the repository for `[START <tag>]` region tags and `.samples/*.spec.json` manifests, resolves each declared language instance to its corresponding source file, and renders prerequisites, run instructions, GitHub search shortcuts, and a curated catalog grouped by product and API version.

### When to Run

Run the generator **whenever you**:
1. Add, remove, or move a sample file (`.java`, `.js`, `.kt`, `.py`).
2. Add or edit a `.samples/*.spec.json` file (especially `title`, `description`, `regionTags`, or `instances`).
3. Update language prerequisites, run instructions, or product display names in [`generators/language_readme_config.json`](generators/language_readme_config.json).

> **Important**: Never edit `docs/JAVA.md`, `docs/JAVASCRIPT.md`, `docs/KOTLIN.md`, or `docs/PYTHON.md` by hand. Always update the underlying `.samples/*.spec.json` manifest or [`language_readme_config.json`](generators/language_readme_config.json) and re-run the generator.

### Usage & CLI Flags

From the repository root:

```bash
# Regenerate all language READMEs in docs/
node sampletools/generators/generate_language_readmes.js

# Verify that all docs/<LANGUAGE>.md files are up to date (exits 1 if stale; ideal for CI)
node sampletools/generators/generate_language_readmes.js --check

# Regenerate only specific language(s) (comma-separated or repeated --lang flags)
node sampletools/generators/generate_language_readmes.js --lang KOTLIN,PYTHON
node sampletools/generators/generate_language_readmes.js --lang JAVASCRIPT

# Specify a custom repository root or output directory
node sampletools/generators/generate_language_readmes.js --repo-root /path/to/repo --output-dir docs
```

| Flag | Description | Default |
| :--- | :--- | :--- |
| `--repo-root <path>` | Root directory of the repository to scan. | Repository root (`../..` relative to script) |
| `--output-dir <path>` | Output directory for generated Markdown files (resolved relative to `--repo-root` if relative). | `docs` |
| `--lang <lang>` | Filter generation/checking to specific language(s) (e.g., `JAVA`, `JAVASCRIPT` / `NODEJS`, `KOTLIN`, `PYTHON`). | All discovered languages |
| `--check` | Verification mode: compares generated output against existing files on disk without writing. Exits with code `1` if any file is missing or out of date. | `false` |

### Adding a New Product or Language

Configuration is stored externally in [`generators/language_readme_config.json`](generators/language_readme_config.json):

- **New Google Cloud Product**: Add an entry mapping the top-level product directory slug to its human-friendly display name under `"product_display_names"` (for example, `"cloudkms": "Cloud Key Management Service"`). If omitted, the generator falls back to title-casing the directory slug.
- **New Language**: Add an entry under `"languages"` specifying `display_name`, `output_filename`, `dir_name`, `extension`, `github_lang`, `dependency_file`, `prerequisites`, `run_instructions`, and `run_code_block`.

After editing [`language_readme_config.json`](generators/language_readme_config.json), run `node sampletools/generators/generate_language_readmes.js` to update `docs/`.

### Running the Unit Tests

The test suite uses Node's built-in `node:test` and `node:assert/strict` modules with temporary isolated directories:

```bash
node sampletools/generators/generate_language_readmes.test.js
```

---

## 2. Sample Spec Validator (`validators/audit_sample_specs.py`)

[`audit_sample_specs.py`](validators/audit_sample_specs.py) enforces a strict 1:1 bidirectional contract between `.samples/*.spec.json` manifests and sample source files across the repository:

1. **Spec -> Code**: Every language instance declared in `instances` within a `.samples/*.spec.json` file must resolve to an existing sample file under that product directory containing both the versioned and versionless `[START <tag>]` region tags.
2. **Code -> Spec**: Every sample source file containing `[START <tag>]` region tags must be claimed by a corresponding `.samples/*.spec.json` manifest.

### When to Run

Run this validator before submitting any PR that adds or modifies sample code, region tags, or `.samples/*.spec.json` files.

### Usage

```bash
python3 sampletools/validators/audit_sample_specs.py .
```

The script exits with code `0` (`SUCCESS: Repository is clean.`) when all specs and sample files match, or `1` with a detailed report of missing tags, orphaned spec instances, or unclaimed sample files.

---

## 3. Shared Node.js Libraries (`lib/`)

Reusable zero-dependency CommonJS modules in `sampletools/lib/` can be imported by generators, validators, or CI scripts:

- **[`lib/region_tags.js`](lib/region_tags.js)**:
  - `deriveVersionlessTag(tagName)`: Strips service version segments (e.g., `_v1_`, `_v2beta1_`) from a versioned region tag.
  - `extractVersionFromTagOrId(identifier)`: Extracts the version token (e.g., `'v1'`) from a `sampleId` or region tag.
  - `extractTagsFromFile(filePath)`: Streams a source file line-by-line and returns all `[START <tag>]` region tags.
  - `buildGlobalTagIndex(rootDir, options)`: Scans the repository using bounded concurrency (`DEFAULT_IO_CONCURRENCY = 32`) while preserving deterministic ordering, returning `{tagIndex, filesByLang}`.
- **[`lib/sample_specs.js`](lib/sample_specs.js)**:
  - `findSpecs(rootDir)`: Recursively locates all `.samples/*.spec.json` manifests.
  - `resolveSampleFile({serviceDir, requiredExt, specTags, expectedVersion, tagIndex})`: Matches a spec language instance to its sample source file, prioritizing the expected service version directory.
  - `collectCuratedSamples(repoRoot, options)`: Resolves all spec-backed samples across the repository grouped by language.
- **[`lib/catalog_config.js`](lib/catalog_config.js)**:
  - `loadConfig(configPath)`, `normalizeLanguageKey(lang)`, `getLanguageMetadata(lang)`, and `getProductDisplayName(productSlug)`.

---

## 4. ESLint Sample Style Plugin (`eslint-sample-style/`)

[`eslint-sample-style`](eslint-sample-style/index.js) provides custom ESLint rules used by Node.js samples in this repository (such as `sample-style/no-tabs-in-strings` to prevent literal tab characters in strings that break documentation snippet rendering).
