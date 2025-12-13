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

# [START documentai_v1beta3_documentprocessorservice_processortype_get]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1beta3


def get_processor_type(
    project_id: str,
    location: str = "us",
    processor_type_id: str = "OCR_PROCESSOR",
) -> None:
    """
    Retrieves details about a specific Document AI processor type.

    Document AI processors are specialized models designed to extract structured
    information from various document types. Each processor type represents a
    category of documents it can handle (e.g., invoices, receipts, OCR). This
    sample demonstrates how to retrieve detailed information about a specific
    processor type, such as its display name, category, and available deployment
    locations.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor type (e.g., "us", "eu").
        processor_type_id: The ID of the processor type to retrieve (e.g., "OCR_PROCESSOR").
    """

    client = documentai_v1beta3.DocumentProcessorServiceClient()

    name = client.processor_type_path(project_id, location, processor_type_id)

    try:
        processor_type = client.get_processor_type(name=name)

        print(f"Processor Type Name: {processor_type.name}")
        # display_name is not available in v1beta3, using type instead as an example
        print(f"Processor Type Display Name: {processor_type.type}")
        print(f"Processor Type ID: {processor_type.type}")
        print(f"Processor Type Category: {processor_type.category}")
        print(f"Allow Creation: {processor_type.allow_creation}")

        print("Available Locations:")
        for loc_info in processor_type.available_locations:
            print(f"  - {loc_info.location_id}")

    except NotFound as e:
        print(
            f"Error: Processor type '{name}' not found. Please check the project ID, "
            "location, and processor type ID."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentprocessorservice_processortype_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves details about a specific Document AI processor type."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
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

    get_processor_type(args.project_id, args.location, args.processor_type_id)
