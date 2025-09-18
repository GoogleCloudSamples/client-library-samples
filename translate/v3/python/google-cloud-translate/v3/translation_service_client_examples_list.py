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

from google.api_core.exceptions import NotFound

# [START translate_v3_list_examples]
from google.cloud import translate_v3 as translate


def list_examples(
    project_id: str,
    location: str,
    dataset_id: str,
) -> None:
    """
    Lists sentence pairs (examples) in a translation dataset.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the dataset (e.g., "us-central1").
        dataset_id: The ID of the dataset to list examples from.
    """
    client = translate.TranslationServiceClient()

    # Construct the full resource name of the parent dataset
    # The dataset name has the format:
    # `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}`
    parent = client.dataset_path(project_id, location, dataset_id)

    try:
        # Iterate over all examples in the dataset
        print(f"Listing examples for dataset: {parent}")
        for example in client.list_examples(parent=parent):
            print(f"  Example Name: {example.name}")
            print(f"    Source Text: {example.source_text.text}")
            print(f"    Target Text: {example.target_text.text}")
            print(f"    Usage: {example.usage}")
            print(f"    Create Time: {example.create_time}")
            print(f"    Update Time: {example.update_time}")

    except NotFound:
        print(f"Error: The dataset '{dataset_id}' not found in project '{project_id}' at location '{location}'.")
        print("Please ensure the project ID, location, and dataset ID are correct and the dataset exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END translate_v3_list_examples]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists sentence pairs (examples) in a translation dataset."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The location of the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--dataset_id",
        type=str,
        required=True,
        help="The ID of the dataset to list examples from.",
    )

    args = parser.parse_args()

    list_examples(
        args.project_id,
        args.location,
        args.dataset_id,
    )
