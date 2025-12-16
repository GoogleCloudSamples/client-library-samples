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

# [START translate_v3_translationservice_datasets_list]
from google.api_core import exceptions
from google.cloud import translate_v3 as translate

def list_datasets_sample(
    project_id: str,
    location: str,
) -> None:
    """
    Lists AutoML Translation datasets for a given project and location.

    This method retrieves a paginated list of datasets. Datasets are collections
    of sentence pairs used to train custom translation models.

    Args:
        project_id: The Google Cloud project ID.
        location: The location (region) of the datasets.
                  For example: "us-central1".
    """
    client = translate.TranslationServiceClient()

    # The `parent` parameter is a string of the form:
    # `projects/{project_number}/locations/{location-id}`
    # or `projects/{project_id}/locations/{location-id}`
    parent = f"projects/{project_id}/locations/{location}"

    try:
        # Iterate over all datasets in the specified project and location.
        print(f"Listing datasets for project {project_id} in location {location}:")
        for dataset in client.list_datasets(parent=parent):
            print(f"  Dataset Name: {dataset.name}")
            print(f"  Display Name: {dataset.display_name}")
            print(f"  Source Language: {dataset.source_language_code}")
            print(f"  Target Language: {dataset.target_language_code}")
            print(f"  Example Count: {dataset.example_count}")
            print("----------------------------------------")

    except exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' or location '{location}' not found, "
            "or no datasets exist. Please ensure the project ID and location are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END translate_v3_translationservice_datasets_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists AutoML Translation datasets."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The location (region) of the datasets, e.g., 'us-central1'.",
    )
    args = parser.parse_args()

    list_datasets_sample(args.project_id, args.location)
