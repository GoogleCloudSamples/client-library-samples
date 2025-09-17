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

# [START documentai_v1_documentprocessorservice_processortypes_list]
from google.api_core.exceptions import GoogleAPIError
from google.cloud import documentai_v1 as documentai


def list_processor_types(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all available processor types in a given location.

    This sample demonstrates how to retrieve a list of all supported Document AI
    processor types for a specific Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor types (e.g., "us").
    """
    client = documentai.DocumentProcessorServiceClient()

    parent = client.common_location_path(project_id, location)

    print(f"Listing processor types in {parent}...")

    try:
        page_result = client.list_processor_types(parent=parent)

        if not page_result.processor_types:
            print("No processor types found.")
        else:
            print("Processor Types:")
            for processor_type in page_result:
                print(f"  Type: {processor_type.type}")
                print(f"  Name: {processor_type.name}")
                print(f"  Launch Stage: {processor_type.launch_stage}")
                print("  --------------------------------------------------")

    except GoogleAPIError as e:
        print(f"Error listing processor types: {e}")
        print(
            "Please ensure the project ID and location are correct and that the service account has the necessary permissions (documentai.processorTypes.list)."
        )


# [END documentai_v1_documentprocessorservice_processortypes_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all available Document AI processor types in a given location."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor types (e.g., 'us', 'eu').",
        required=True,
    )

    args = parser.parse_args()

    list_processor_types(args.project_id, args.location)
