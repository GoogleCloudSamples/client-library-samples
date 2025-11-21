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

# [START translate_v3_translationservice_adaptivemtdataset_delete]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import NotFound

def delete_adaptive_mt_dataset(
    project_id: str,
    location: str,
    dataset_id: str,
) -> None:
    """
    Deletes an Adaptive MT dataset, including all its entries and associated metadata.

    Adaptive MT datasets store parallel sentence pairs that can be used to train
    custom translation models or improve translation quality for specific domains.
    Deleting a dataset permanently removes this data.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the dataset (e.g., "us-central1").
        dataset_id: The ID of the Adaptive MT dataset to delete.
    """
    client = translate.TranslationServiceClient()

    name = client.adaptive_mt_dataset_path(
        project=project_id,
        location=location,
        dataset=dataset_id,
    )

    try:
        client.delete_adaptive_mt_dataset(name=name)
        print(f"Deleted Adaptive MT dataset: {name}")
    except NotFound:
        print(f"Adaptive MT dataset {name} not found.")
        print("Please ensure the dataset ID and location are correct.")
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Failed to delete the Adaptive MT dataset.")

# [END translate_v3_translationservice_adaptivemtdataset_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes an Adaptive MT dataset."
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
        default="us-central1",  # Replace with the dataset's location
        help="The location of the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--dataset_id",
        type=str,
        default="your-adaptive-mt-dataset-id",  # Replace with your dataset ID
        help="The ID of the Adaptive MT dataset to delete.",
    )

    args = parser.parse_args()

    delete_adaptive_mt_dataset(
        args.project_id,
        args.location,
        args.dataset_id,
    )
