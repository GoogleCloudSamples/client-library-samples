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

# [START documentai_v1_documentprocessorservice_processor_create]
from google.api_core.exceptions import AlreadyExists
from google.cloud import documentai_v1


def create_processor(
    project_id: str,
    location: str,
    processor_display_name: str,
) -> None:
    """Creates a new Document AI processor.

    This sample demonstrates how to create a new processor for document
    processing. A processor is an AI model that extracts structured
    information from documents.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_display_name: The display name for the new processor.
    """
    client = documentai_v1.DocumentProcessorServiceClient()

    parent = client.common_location_path(project_id, location)

    processor = documentai_v1.Processor(
        display_name=processor_display_name,
        type="FORM_PARSER_PROCESSOR",
    )

    try:
        print(
            f"Creating processor '{processor_display_name}' of type 'FORM_PARSER_PROCESSOR' in location '{location}'..."
        )
        response = client.create_processor(parent=parent, processor=processor)

        print(f"Processor created successfully:")
        print(f"  Name: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Type: {response.type}")
        print(f"  State: {response.state.name}")
    except AlreadyExists as e:
        print(
            f"Error: A processor with display name '{processor_display_name}' already exists in location '{location}'."
        )
        print(
            f"Please choose a different display name or delete the existing processor if it's no longer needed."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processor_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Document AI processor.")
    parser.add_argument(
        "--project_id",
        type=str,
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor (e.g., 'us').",
        default="us",
    )
    parser.add_argument(
        "--processor_display_name",
        type=str,
        help="The display name for the new processor. Must be unique within the location.",
        default="my-new-processor-py-sample",
    )

    args = parser.parse_args()

    create_processor(args.project_id, args.location, args.processor_display_name)
