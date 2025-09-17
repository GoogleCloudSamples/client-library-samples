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

# [START documentai_v1_documentprocessorservice_processor_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import documentai_v1 as documentai


def get_document_processor(project_id: str, location: str, processor_id: str) -> None:
    """
    Retrieves details about a specific Document AI processor.

    This function demonstrates how to get information about a Document AI
    processor, including its display name, type, state, default version,
    and creation time. It handles cases where the processor is not found
    or other API errors occur.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us" or "eu").
        processor_id: The ID of the processor to retrieve.
    """
    client = documentai.DocumentProcessorServiceClient()

    processor_name = client.processor_path(project_id, location, processor_id)

    try:
        processor = client.get_processor(name=processor_name)

        print(f"Processor Name: {processor.name}")
        print(f"Processor Display Name: {processor.display_name}")
        print(f"Processor Type: {processor.type}")
        print(f"Processor State: {processor.state.name}")
        if processor.default_processor_version:
            print(
                "Default Processor Version: " f"{processor.default_processor_version}"
            )
        print(f"Processor Create Time: {processor.create_time}")
        print("Successfully retrieved processor details.")

    except NotFound as e:
        print(
            f"Error: Processor '{processor_id}' not found in location '{location}'."
            " Please ensure the processor ID and location are correct."
        )
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check your project ID, location, and processor ID for correctness, "
            "and ensure the service account has the necessary permissions (e.g., Document AI Viewer)."
        )
        print(f"Details: {e.details}")


# [END documentai_v1_documentprocessorservice_processor_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve details about a Document AI processor."
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
        help="The location of the processor (e.g., 'us' or 'eu').",
    )
    parser.add_argument(
        "--processor_id",
        type=str,
        required=True,
        help="The ID of the processor to retrieve.",
    )

    args = parser.parse_args()

    get_document_processor(args.project_id, args.location, args.processor_id)
