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

# [START documentai_v1beta3_documentprocessorservice_processor_types_list]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1beta3 as documentai


def list_processor_types(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all available processor types in a given location.

    Processor types define the capabilities of a Document AI processor, such as
    "OCR_PROCESSOR" for optical character recognition or "FORM_PARSER_PROCESSOR"
    for extracting form data. This sample demonstrates how to retrieve a list of
    these available types for a specific Google Cloud location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor types to list (e.g., "us").
                  A full list of available locations can be found at:
                  https://cloud.google.com/document-ai/docs/locations
    """
    client = documentai.DocumentProcessorServiceClient()

    parent = client.common_location_path(project_id, location)

    try:
        page_result = client.list_processor_types(parent=parent)

        print(f"Processor types in {location}:")
        for processor_type in page_result:
            print("---------------------------------")
            print(f"Name: {processor_type.name}")
            print(f"Type: {processor_type.type}")
            print(f"Allow Creation: {processor_type.allow_creation}")
            print(f"Launch Stage: {processor_type.launch_stage}")

    except NotFound as e:
        print(f"Error: The specified project or location was not found: {parent}")
        print(
            f"Please ensure the project ID and location are correct and that the Document AI API is enabled."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentprocessorservice_processor_types_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Document AI processor types in a given location."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor types (e.g., 'us', 'eu').",
        required=True,
    )

    args = parser.parse_args()

    list_processor_types(args.project_id, args.location)
