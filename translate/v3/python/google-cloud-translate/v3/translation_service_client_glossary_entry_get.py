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

# [START translate_v3_translationservice_glossaryentry_get]
from google.cloud import translate_v3 as translate

from google.api_core.exceptions import NotFound, GoogleAPICallError


def get_glossary_entry_sample(
    project_id: str,
    location: str,
    glossary_id: str,
    glossary_entry_id: str,
) -> None:
    """Retrieves a specific glossary entry from a glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., 'us-central1').
        glossary_id: The ID of the glossary.
        glossary_entry_id: The ID of the glossary entry to retrieve.
    """
    # Instantiate the client. This client is a context manager, so it will be
    # closed automatically when the with block is exited.
    with translate.TranslationServiceClient() as client:
        # Construct the full resource name for the glossary entry
        # Example: projects/PROJECT_ID/locations/LOCATION_ID/glossaries/GLOSSARY_ID/glossaryEntries/GLOSSARY_ENTRY_ID
        glossary_entry_name = client.glossary_entry_path(
            project_id, location, glossary_id, glossary_entry_id
        )

        try:
            # Make the API call to get the glossary entry
            glossary_entry = client.get_glossary_entry(name=glossary_entry_name)

            # Print the details of the retrieved glossary entry
            print(f"Glossary Entry Name: {glossary_entry.name}")
            print(f"Description: {glossary_entry.description}")

            if glossary_entry.terms_pair:
                print(
                    f"Source Term: {glossary_entry.terms_pair.source_term.text} "
                    f"({glossary_entry.terms_pair.source_term.language_code})"
                )
                print(
                    f"Target Term: {glossary_entry.terms_pair.target_term.text} "
                    f"({glossary_entry.terms_pair.target_term.language_code})"
                )
            elif glossary_entry.terms_set:
                terms = ", ".join(
                    f"{term.text} ({term.language_code})" for term in glossary_entry.terms_set.terms
                )
                print(f"Terms Set: {terms}")

        except NotFound:
            print(
                f"Error: Glossary entry '{glossary_entry_name}' not found. "
                "Please ensure the glossary ID and entry ID are correct and the glossary entry exists."
            )
        except GoogleAPICallError as e:
            # Handle other Google API-specific errors.
            print(f"A Google Cloud Translation API error occurred: {e}")
            print("Please check the request parameters and your project's permissions.")
        except Exception as e:
            # Catch any other unexpected errors.
            print(f"An unexpected error occurred: {e}")
            print("Please review the error message and consult the client library documentation for troubleshooting.")

# [END translate_v3_translationservice_glossaryentry_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a specific glossary entry from Google Cloud Translation."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-samples-data",
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="my-glossary",
        help="The ID of the glossary.",
    )
    parser.add_argument(
        "--glossary_entry_id",
        type=str,
        default="my-entry",
        help="The ID of the glossary entry to retrieve.",
    )

    args = parser.parse_args()

    get_glossary_entry_sample(
        args.project_id,
        args.location,
        args.glossary_id,
        args.glossary_entry_id,
    )
