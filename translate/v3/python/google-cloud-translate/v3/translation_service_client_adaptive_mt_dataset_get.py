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

# [START translate_v3_translationservice_adaptivemtdataset_get]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import NotFound, GoogleAPICallError

def get_adaptive_mt_dataset(
    project_id: str,
    location: str,
    dataset_id: str,
) -> None:
    """
    Retrieves an Adaptive MT dataset.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the dataset (e.g., "us-central1").
        dataset_id: The ID of the Adaptive MT dataset to retrieve.
    """
    client = translate.TranslationServiceClient()

    # The resource name of the dataset.
    # Format: projects/{project-number-or-id}/locations/{location-id}/adaptiveMtDatasets/{dataset-id}
    name = client.adaptive_mt_dataset_path(project_id, location, dataset_id)

    try:
        response = client.get_adaptive_mt_dataset(name=name)

        print(f"Adaptive MT Dataset retrieved: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Source Language: {response.source_language_code}")
        print(f"  Target Language: {response.target_language_code}")
        print(f"  Example Count: {response.example_count}")
        print(f"  Create Time: {response.create_time.isoformat()}")
        print(f"  Update Time: {response.update_time.isoformat()}")

    except NotFound:
        print(f"Error: Adaptive MT Dataset '{name}' not found.")
        print("Please ensure the dataset ID and location are correct and the dataset exists.")
    except GoogleAPICallError as e:
        # Catch other API-related errors.
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")


# [END translate_v3_translationservice_adaptivemtdataset_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves an Adaptive MT dataset."
    )
    parser.add_argument(
        "project_id",
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "location",
        type=str,
        help="The location of the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "dataset_id",
        type=str,
        help="The ID of the Adaptive MT dataset to retrieve.",
    )

    args = parser.parse_args()

    get_adaptive_mt_dataset(args.project_id, args.location, args.dataset_id)
