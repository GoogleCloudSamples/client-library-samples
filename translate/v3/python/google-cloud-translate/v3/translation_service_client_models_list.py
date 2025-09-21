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

# [START translate_v3_translation_service_list_models]
from google.api_core import exceptions
from google.cloud import translate_v3 as translate

def list_translation_models(
    project_id: str,
    location: str,
) -> None:
    """
    Lists custom translation models available in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location (region) of the models.
            For example, "us-central1".
    """
    client = translate.TranslationServiceClient()

    # The `parent` parameter is formatted as projects/{project_id}/locations/{location}
    # For example, projects/my-project/locations/us-central1
    parent = client.location_path(project_id, location)

    try:
        # List models
        print(f"Listing models for project '{project_id}' in location '{location}':")
        for model in client.list_models(parent=parent):
            print(f"  Model Name: {model.name}")
            print(f"  Display Name: {model.display_name}")
            print(f"  Source Language: {model.source_language_code}")
            print(f"  Target Language: {model.target_language_code}")
            print(f"  Create Time: {model.create_time.isoformat()}")
            print("\n")

    except exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' or location '{location}' not found. "
            "Please ensure the project ID and location are correct and you have "
            "the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END translate_v3_translation_service_list_models]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists custom translation models in a project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",  # Replace with your Google Cloud Project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Replace with the desired location, e.g., "us-central1"
        help="The location (region) of the models (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_translation_models(args.project_id, args.location)
