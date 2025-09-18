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

# [START translate_v3beta1_translationservice_glossary_delete]
from google.cloud import translate_v3beta1 as translate
from google.api_core.exceptions import NotFound

def delete_glossary_sample(
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

    # Construct the full glossary name
    # The glossary name has the format: projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
    name = client.glossary_path(project_id, location, glossary_id)

    try:
        operation = client.delete_glossary(name=name)
        print(f"Waiting for operation to complete...")
        response = operation.result()
        print(f"Deleted glossary: {response.name}")
        print(f"Deletion time: {response.submit_time.isoformat()} to {response.end_time.isoformat()}")
    except NotFound:
        print(f"Glossary '{name}' not found. It may have already been deleted or never existed.")
    except Exception as e:
        print(f"An error occurred: {e}")

# [END translate_v3beta1_translationservice_glossary_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a glossary from Google Cloud Translation."
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
        default="us-central1",  # Replace with your glossary's location
        help="The location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        type=str,
        default="my-glossary-to-delete",  # Replace with the ID of the glossary to delete
        help="The ID of the glossary to delete.",
    )

    args = parser.parse_args()

    delete_glossary_sample(args.project_id, args.location, args.glossary_id)
