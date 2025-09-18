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

# [START translate_v3beta1_get_glossary]
from google.cloud import translate_v3beta1 as translate
from google.api_core.exceptions import NotFound, GoogleAPICallError

def get_glossary_sample(
    project_id: str,
    location: str,
    glossary_id: str,
) -> None:
    """
    Retrieves details of a specific glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to retrieve.
    """
    # [START_EXCLUDE]
    # The project ID and location are required for the glossary path.
    # The glossary ID is the unique identifier for the glossary.
    # For example, if your glossary is named 'my-glossary',
    # then glossary_id would be 'my-glossary'.
    # [END_EXCLUDE]
    
    try:
        # Initialize the client within a 'with' statement to ensure resources are properly closed.
        with translate.TranslationServiceClient() as client:
            # The full resource name of the glossary
            # projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
            glossary_name = client.glossary_path(project_id, location, glossary_id)

            response = client.get_glossary(name=glossary_name)
            print(f"Glossary retrieved: {response.name}")
            print(f"  Entry count: {response.entry_count}")
            # Check if input_config and gcs_source exist before accessing input_uri
            if response.input_config and response.input_config.gcs_source:
                print(f"  Input URI: {response.input_config.gcs_source.input_uri}")
            if response.language_pair:
                print(f"  Source language: {response.language_pair.source_language_code}")
                print(f"  Target language: {response.language_pair.target_language_code}")
            elif response.language_codes_set:
                print(f"  Languages: {', '.join(response.language_codes_set.language_codes)}")

    except NotFound:
        print(f"Glossary '{glossary_id}' not found in project '{project_id}' at location '{location}'.")
        print("Please ensure the glossary ID and location are correct.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")

# [END translate_v3beta1_get_glossary]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves details of a specific glossary."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="my-project-id-123", # Replace with your Google Cloud Project ID
        help="Your Google Cloud project ID.",
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
        help="The ID of the glossary to retrieve.",
    )

    args = parser.parse_args()

    get_glossary_sample(args.project_id, args.location, args.glossary_id)
