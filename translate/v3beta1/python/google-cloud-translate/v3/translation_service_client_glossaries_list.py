# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START translate_v3beta1_translationservice_glossaries_list]
from google.api_core.exceptions import NotFound
from google.cloud import translate_v3beta1 as translate

def list_glossaries_sample(
    project_id: str,
    location: str
) -> None:
    """
    Lists glossaries available in a given project and location.

    Glossaries are custom dictionaries that the Translation API uses to translate
    domain-specific terminology consistently.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossaries (e.g., "us-central1").
    """
    client = translate.TranslationServiceClient()

    # The `parent` parameter is formatted as "projects/{project_id}/locations/{location}"
    parent = f"projects/{project_id}/locations/{location}"

    try:
        # Iterate over all glossaries. The API response is paginated.
        page_result = client.list_glossaries(parent=parent)

        print(f"Glossaries in {parent}:")
        found_glossaries = False
        for glossary in page_result:
            found_glossaries = True
            print(f"  Glossary Name: {glossary.name}")
            if glossary.language_pair:
                print(f"    Source Language: {glossary.language_pair.source_language_code}")
                print(f"    Target Language: {glossary.language_pair.target_language_code}")
            elif glossary.language_codes_set:
                print(f"    Languages: {', '.join(glossary.language_codes_set.language_codes)}")
            print(f"    Entry Count: {glossary.entry_count}")
            print(f"    Input URI: {glossary.input_config.gcs_source.input_uri}")

        if not found_glossaries:
            print("  No glossaries found.")

    except NotFound as e:
        print(f"Error: Project or location not found. Please ensure '{parent}' is valid.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END translate_v3beta1_translationservice_glossaries_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists glossaries in a Google Cloud project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # Replace with your actual project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Or your desired location
        help="The location of the glossaries (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_glossaries_sample(args.project_id, args.location)
