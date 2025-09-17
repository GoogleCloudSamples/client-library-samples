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

# [START documentai_v1beta3_documentprocessorservice_processor_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import documentai_v1beta3


def get_processor(project_id: str, location: str, processor_id: str) -> None:
    """
    Retrieves the details of a specific Document AI processor.

    This function demonstrates how to get information about an existing processor,
    including its type, display name, and current state.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us" or "us-central1").
        processor_id: The ID of the processor to retrieve.
    """

    client = documentai_v1beta3.DocumentProcessorServiceClient()

    processor_name = client.processor_path(project_id, location, processor_id)

    try:
        processor = client.get_processor(name=processor_name)

        print(f"Successfully retrieved processor: {processor.name}")
        print(f"Display Name: {processor.display_name}")
        print(f"Type: {processor.type}")
        print(f"State: {processor.state.name}")
        if processor.default_processor_version:
            print(f"Default Processor Version: {processor.default_processor_version}")

    except NotFound:
        print(f"Error: Processor '{processor_name}' not found.")
        print("Please ensure the project ID, location, and processor ID are correct.")
        print("You can list available processors using the `list_processors` sample.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(f"Could not retrieve processor '{processor_name}'.")
        print("Please check your network connection and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(f"Failed to retrieve processor '{processor_name}'.")


# [END documentai_v1beta3_documentprocessorservice_processor_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the details of a specific Document AI processor."
    )
    parser.add_argument("project_id", help="The Google Cloud project ID.")
    parser.add_argument(
        "location", help="The location of the processor (e.g., 'us' or 'us-central1')."
    )
    parser.add_argument("processor_id", help="The ID of the processor to retrieve.")

    args = parser.parse_args()

    get_processor(
        project_id=args.project_id,
        location=args.location,
        processor_id=args.processor_id,
    )
