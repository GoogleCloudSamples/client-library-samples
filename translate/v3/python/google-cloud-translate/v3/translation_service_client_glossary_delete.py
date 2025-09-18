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

# [START translate_v3_translationservice_glossary_delete]
from google.cloud import translate_v3 as translate
from google.api_core import exceptions

def delete_glossary(
    project_id: str,
    location: str,
    glossary_id: str,
) -> None:
    """
    Deletes a glossary.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossary (e.g., "us-central1").
        glossary_id: The ID of the glossary to delete.
    """
    client = translate.TranslationServiceClient()

    # Construct the full resource name for the glossary
    # The glossary name has the format:
    # projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
    name = client.glossary_path(project_id, location, glossary_id)

    try:
        # The delete_glossary method returns a long-running operation.
        # Call .result() to wait for the operation to complete.
        operation = client.delete_glossary(name=name)
        response = operation.result()
        print(f"Deleted glossary: {response.name}")
    except exceptions.NotFound:
        print(f"Glossary '{glossary_id}' not found in project '{project_id}' at location '{location}'.")
    except Exception as e:
        print(f"An error occurred: {e}")

# [END translate_v3_translationservice_glossary_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a glossary from Google Cloud Translation."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # Replace with your actual project ID
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Example: 'us-central1'
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="my-glossary-to-delete",  # Replace with the ID of the glossary to delete
        help="The ID of the glossary to delete.",
    )

    args = parser.parse_args()

    delete_glossary(args.project_id, args.location, args.glossary_id)
