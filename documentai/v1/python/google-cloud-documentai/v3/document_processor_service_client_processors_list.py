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

# [START documentai_v1_documentprocessorservice_processors_list]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1


def list_processors(project_id: str, location: str) -> None:
    """
    Lists all processors within a specified Google Cloud project and location.

    This sample demonstrates how to retrieve a list of Document AI processors
    that have been created in a given project and region.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us", "eu").
    """
    client = documentai_v1.DocumentProcessorServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    print(f"Listing processors in {parent}...")

    try:
        page_result = client.list_processors(parent=parent)

        found_processors = False
        for processor in page_result:
            found_processors = True
            print(f"Processor Name: {processor.name}")
            print(f"  Display Name: {processor.display_name}")
            print(f"  Type: {processor.type}")
            print(f"  State: {processor.state.name}")
            print(
                f"  KMS Key Name: {processor.kms_key_name if processor.kms_key_name else 'N/A'}"
            )
            print("-" * 20)

        if not found_processors:
            print(f"No processors found in {parent}.")

    except NotFound:
        print(
            f"Error: The specified project ID '{project_id}' or location '{location}' "
            "was not found or does not exist. Please ensure they are correct "
            "and that the Document AI API is enabled for your project."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processors_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Document AI processors in a given project and location."
    )
    parser.add_argument(
        "project_id",
        help="The Google Cloud project ID. (e.g., 'your-project-id')",
    )
    parser.add_argument(
        "location",
        help="The Google Cloud region (e.g., 'us', 'eu').",
    )
    args = parser.parse_args()

    list_processors(args.project_id, args.location)
