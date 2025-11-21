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
import sys

# [START translate_v3_translationservice_dataset_create]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError


def create_dataset(
    project_id: str,
    location: str,
    display_name: str,
    source_language_code: str,
    target_language_code: str,
) -> None:
    """Creates a dataset for custom model training.

    A dataset stores sentence pairs (examples) that are used to train custom
    translation models. This function creates an empty dataset, which can
    then be populated with data using the `import_data` method.

    Args:
        project_id: The Google Cloud project ID.
        location: The location (region) to create the dataset (e.g., "us-central1").
        display_name: The display name for the dataset.
        source_language_code: The BCP-47 language code of the source language (e.g., "en").
        target_language_code: The BCP-47 language code of the target language (e.g., "fr").
    """
    client = translate.TranslationServiceClient()

    # The parent format is projects/{project_id}/locations/{location}
    parent = client.location_path(project_id, location)

    dataset = translate.types.Dataset(
        display_name=display_name,
        source_language_code=source_language_code,
        target_language_code=target_language_code,
    )

    print(f"Creating dataset '{display_name}' in location '{location}'...")
    try:
        operation = client.create_dataset(parent=parent, dataset=dataset)
        # Datasets are created asynchronously. The `operation.result()` call
        # waits for the operation to complete and returns the created dataset.
        result = operation.result()
        print(f"Dataset created: {result.name}")
        print(f"  Display Name: {result.display_name}")
        print(f"  Source Language: {result.source_language_code}")
        print(f"  Target Language: {result.target_language_code}")
        print(f"  Create Time: {result.create_time.strftime('%Y-%m-%d %H:%M:%S')}")
    except AlreadyExists as e:
        print(f"Error: Dataset '{display_name}' already exists in '{location}'.")
        print(f"Details: {e}")
        # In a real application, you might want to retrieve the existing dataset
        # to confirm its details or handle the conflict appropriately.
        sys.exit(1)
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)


# [END translate_v3_translationservice_dataset_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a dataset for custom translation model training."
    )
    parser.add_argument(
        "project_id",
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "location",
        help="The location (region) to create the dataset (e.g., 'us-central1').",
    )
    parser.add_argument(
        "display_name",
        help="The display name for the dataset. Example: 'my-translation-dataset'.",
    )
    parser.add_argument(
        "source_language_code",
        help="The BCP-47 language code of the source language (e.g., 'en').",
    )
    parser.add_argument(
        "target_language_code",
        help="The BCP-47 language code of the target language (e.g., 'fr').",
    )

    args = parser.parse_args()

    create_dataset(
        args.project_id,
        args.location,
        args.display_name,
        args.source_language_code,
        args.target_language_code,
    )
