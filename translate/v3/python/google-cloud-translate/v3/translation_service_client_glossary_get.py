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

# [START translate_v3_translationservice_glossary_get]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import NotFound

def get_glossary(
    project_id: str,
    location: str,
    glossary_id: str
) -> None:
    """Retrieves a specific glossary by its ID.

    Glossaries contain custom terminology that Cloud Translation can use to
    translate text more accurately and consistently. This sample demonstrates
    how to fetch details of an existing glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to retrieve.
    """
    # Instantiates a client. Clients can be reused across multiple requests to
    # speed up calls.
    client = translate.TranslationServiceClient()

    # Construct the full glossary name.
    # The glossary name has the format:
    # projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
    name = client.glossary_path(project_id, location, glossary_id)

    try:
        glossary = client.get_glossary(name=name)

        print(f"Glossary Name: {glossary.name}")
        print(f"Entry Count: {glossary.entry_count}")
        if glossary.language_pair:
            print(f"Source Language Code: {glossary.language_pair.source_language_code}")
            print(f"Target Language Code: {glossary.language_pair.target_language_code}")
        elif glossary.language_codes_set:
            print(f"Language Codes: {glossary.language_codes_set.language_codes}")
        print(f"Input URI: {glossary.input_config.gcs_source.input_uri}")
        print(f"Created Time: {glossary.submit_time.strftime('%Y-%m-%d %H:%M:%S')}")

    except NotFound:
        print(f"Glossary '{glossary_id}' not found in project '{project_id}' at location '{location}'.")
        print("Please ensure the glossary ID and location are correct and the glossary exists.")
    except Exception as e:
        # Handle other potential exceptions, e.g., network issues, permissions errors
        print(f"An unexpected error occurred: {e}")

# [END translate_v3_translationservice_glossary_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific glossary by its ID."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # TODO(developer): Replace with your Google Cloud Project ID
        help="Your Google Cloud Project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # TODO(developer): Replace with the location of your glossary (e.g., 'us-central1')
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="YOUR_GLOSSARY_ID",  # TODO(developer): Replace with an existing glossary ID
        help="The ID of the glossary to retrieve.",
    )
    args = parser.parse_args()

    get_glossary(
        project_id=args.project_id,
        location=args.location,
        glossary_id=args.glossary_id,
    )
