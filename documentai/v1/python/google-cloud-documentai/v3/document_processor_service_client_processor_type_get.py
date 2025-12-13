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

# [START documentai_v1_documentprocessorservice_processor_type_get]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1 as documentai


def get_processor_type(
    project_id: str,
    location: str,
    processor_type_id: str,
) -> None:
    """
    Retrieves the details of a specific processor type.

    This sample demonstrates how to get information about a Document AI processor type,
    such as its display name, category, and available locations.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor type (e.g., "us", "eu").
        processor_type_id: The ID of the processor type to retrieve
                           (e.g., "OCR_PROCESSOR").
    """
    client = documentai.DocumentProcessorServiceClient()

    name = client.processor_type_path(project_id, location, processor_type_id)

    try:
        processor_type = client.get_processor_type(name=name)

        print(f"Processor Type Name: {processor_type.name}")
        print(f"Type: {processor_type.type}")
        print(f"Category: {processor_type.category}")
        print("Available Locations:")
        for loc_info in processor_type.available_locations:
            print(f"  - {loc_info.location_id}")
        print(f"Allow Creation: {processor_type.allow_creation}")

    except NotFound as e:
        print(
            f"Error: Processor type '{processor_type_id}' not found in location '{location}'. "
            f"Please ensure the processor type ID and location are correct.\nDetails: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processor_type_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves details of a Document AI processor type."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor type (e.g., 'us', 'eu').",
        required=True,
    )
    parser.add_argument(
        "--processor_type_id",
        type=str,
        help="The ID of the processor type to retrieve (e.g., 'OCR_PROCESSOR').",
        required=True,
    )

    args = parser.parse_args()

    get_processor_type(
        args.project_id,
        args.location,
        args.processor_type_id,
    )
