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

# [START translate_v3_translationservice_adaptivemtdatasets_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import translate_v3 as translate


def list_adaptive_mt_datasets_sample(
    project_id: str, location: str
) -> None:
    """
    Lists all Adaptive MT datasets for a given project and location.

    This function demonstrates how to retrieve a list of existing Adaptive MT
    datasets within a specified Google Cloud project and geographic location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the Adaptive MT datasets (e.g., "us-central1").
    """
    client = translate.TranslationServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        # List all Adaptive MT datasets for the given project and location.
        # The API response is a paginated list of AdaptiveMtDataset objects.
        page_result = client.list_adaptive_mt_datasets(parent=parent)

        print(f"Adaptive MT Datasets in {parent}:")
        found_datasets = False
        for dataset in page_result:
            found_datasets = True
            print(f"  Dataset Name: {dataset.name}")
            print(f"  Source Language: {dataset.example_count} examples")
            print(f"  Target Language: {dataset.create_time.isoformat()}")
            print("---")

        if not found_datasets:
            print("No Adaptive MT datasets found.")

    except NotFound:
        print(f"Error: The specified location '{location}' or project '{project_id}' was not found.")
        print("Please ensure the project ID is correct and the location is valid and has Adaptive MT datasets.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and ensure the Translation API is enabled.")


# [END translate_v3_translationservice_adaptivemtdatasets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Adaptive MT datasets in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The location of the Adaptive MT datasets (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    # If the user provides default values, warn them to change them.
    if args.project_id == "YOUR_PROJECT_ID":
        print(
            "Warning: Please replace 'YOUR_PROJECT_ID' with your actual Google Cloud project ID."
        )

    list_adaptive_mt_datasets_sample(args.project_id, args.location)
