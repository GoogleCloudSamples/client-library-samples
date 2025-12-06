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

# [START translate_v3_translationservice_dataset_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import translate_v3 as translate


def get_dataset(
    project_id: str,
    location: str,
    dataset_id: str,
) -> None:
    """Retrieves a specific dataset from the Translation API.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the dataset (e.g., "us-central1").
        dataset_id: The ID of the dataset to retrieve.
    """
    client = translate.TranslationServiceClient()
    # It is recommended to use the client as a context manager to ensure resources are properly released.
    # For example:
    # with translate.TranslationServiceClient() as client:
    #     ...

    name = client.dataset_path(project_id, location, dataset_id)

    try:
        response = client.get_dataset(name=name)
        print(f"Dataset retrieved: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Source Language Code: {response.source_language_code}")
        print(f"Target Language Code: {response.target_language_code}")
        print(f"Example Count: {response.example_count}")
        print(f"Create Time: {response.create_time.isoformat()}")
    except NotFound:
        print(f"Dataset {name} not found.")
        print("Please ensure the dataset ID and location are correct.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and network connectivity.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END translate_v3_translationservice_dataset_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "project_id", help="The Google Cloud project ID."
    )
    parser.add_argument(
        "location",
        help="The location of the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "dataset_id", help="The ID of the dataset to retrieve."
    )
    args = parser.parse_args()

    get_dataset(args.project_id, args.location, args.dataset_id)
