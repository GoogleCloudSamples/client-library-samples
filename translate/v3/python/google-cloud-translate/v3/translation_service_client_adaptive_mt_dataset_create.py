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

# [START translate_v3_translationservice_adaptivemtdataset_create]
from google.cloud import translate_v3
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError

def create_adaptive_mt_dataset(
    project_id: str,
    location: str,
    dataset_display_name: str,
    source_language_code: str,
    target_language_code: str,
) -> None:
    """
    Creates an Adaptive MT dataset.

    Adaptive MT datasets are used to provide custom translation examples to the
    Translation API, allowing it to learn and improve translations for specific
    domains or terminology. This method creates an empty dataset that can later
    be populated with parallel sentence pairs.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the dataset (e.g., "us-central1").
        dataset_display_name: The display name for the Adaptive MT dataset.
            This name must be unique within the project and location.
        source_language_code: The BCP-47 language code of the source language
            for the dataset (e.g., "en").
        target_language_code: The BCP-47 language code of the target language
            for the dataset (e.g., "es").
    """
    client = translate_v3.TranslationServiceClient()

    # Construct the parent resource path
    parent = client.location_path(project_id, location)

    # Create an AdaptiveMtDataset object
    adaptive_mt_dataset = translate_v3.AdaptiveMtDataset(
        display_name=dataset_display_name,
        source_language_code=source_language_code,
        target_language_code=target_language_code,
    )

    try:
        # Send the request to create the dataset
        response = client.create_adaptive_mt_dataset(
            parent=parent,
            adaptive_mt_dataset=adaptive_mt_dataset,
        )

        print(f"Created Adaptive MT Dataset: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Source Language: {response.source_language_code}")
        print(f"  Target Language: {response.target_language_code}")
        print(f"  Example Count: {response.example_count}")

    except AlreadyExists as e:
        print(f"Error: Adaptive MT Dataset '{dataset_display_name}' already exists in {location}.")
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        # For other API errors, provide guidance on how to debug.
        # This might include checking permissions, quotas, or input validity.

# [END translate_v3_translationservice_adaptivemtdataset_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create an Adaptive MT dataset."
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
        help="The location of the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--dataset_display_name",
        type=str,
        default="my-adaptive-mt-dataset-example",
        help="The display name for the Adaptive MT dataset.",
    )
    parser.add_argument(
        "--source_language_code",
        type=str,
        default="en",
        help="The BCP-47 language code of the source language (e.g., 'en').",
    )
    parser.add_argument(
        "--target_language_code",
        type=str,
        default="es",
        help="The BCP-47 language code of the target language (e.g., 'es').",
    )

    args = parser.parse_args()

    create_adaptive_mt_dataset(
        args.project_id,
        args.location,
        args.dataset_display_name,
        args.source_language_code,
        args.target_language_code,
    )
