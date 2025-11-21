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

# This script demonstrates how to list glossary entries for a given glossary
# using the Google Cloud Translation API.
#
# To run this script:
# 1. Ensure you have authenticated to Google Cloud (e.g., `gcloud auth application-default login`).
# 2. Install the Google Cloud Translation client library: `pip install google-cloud-translate`.
# 3. Run the script with your project ID, location, and glossary ID:
#    `python your_script_name.py --project_id YOUR_PROJECT_ID --location us-central1 --glossary_id YOUR_GLOSSARY_ID`

import argparse

from google.api_core.exceptions import NotFound

# [START translate_v3_translationservice_glossaryentries_list]
from google.cloud import translate_v3 as translate

def list_glossary_entries_sample(
    project_id: str,
    location: str,
    glossary_id: str,
) -> None:
    """
    Lists all glossary entries for a given glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to list entries from.
    """
    client = translate.TranslationServiceClient()

    # Construct the parent path for the glossary.
    # The glossary name has the format:
    # projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
    glossary_name = client.glossary_path(project_id, location, glossary_id)

    print(f"Listing glossary entries for glossary: {glossary_name}")

    try:
        # Make the API call to list glossary entries.
        page_result = client.list_glossary_entries(parent=glossary_name)

        # Handle the response by iterating over the glossary entries.
        entry_count = 0
        for entry in page_result:
            entry_count += 1
            print(f"  Glossary Entry Name: {entry.name}")
            if entry.terms_pair:
                print(f"    Source Term: {entry.terms_pair.source_term.text} ({entry.terms_pair.source_term.language_code})")
                print(f"    Target Term: {entry.terms_pair.target_term.text} ({entry.terms_pair.target_term.language_code})")
            elif entry.terms_set:
                print("    Terms Set:")
                for term in entry.terms_set.terms:
                    print(f"      - {term.text} ({term.language_code})")
            print("\n")

        if entry_count == 0:
            print("No glossary entries found for the specified glossary.")
        else:
            print(f"Successfully listed {entry_count} glossary entries.")

    except NotFound as e:
        print(f"Error: The specified glossary '{glossary_name}' was not found.")
        print("Please ensure the project ID, location, and glossary ID are correct and the glossary exists.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please check your network connection and Google Cloud project permissions.")

# [END translate_v3_translationservice_glossaryentries_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists glossary entries for a given glossary."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        help="The ID of the glossary to list entries from.",
    )
    args = parser.parse_args()

    list_glossary_entries_sample(args.project_id, args.location, args.glossary_id)
