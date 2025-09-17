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

# [START documentai_v1beta3_documentprocessorservice_processor_create]
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError
from google.cloud import documentai_v1beta3


def create_document_processor(
    project_id: str,
    location: str,
    processor_display_name: str,
    processor_type_id: str,
) -> None:
    """
    Creates a new Document AI processor.

    A processor is a specialized AI model that extracts structured information
    from documents. Each processor is associated with a specific processor type
    (e.g., "FORM_PARSER_PROCESSOR") and operates within a given Google Cloud
    project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us" or "eu").
        processor_display_name: The display name for the new processor.
        processor_type_id: The type of the processor (e.g., "FORM_PARSER_PROCESSOR").
                           A list of available processor types can be fetched using
                           `client.fetch_processor_types` or `client.list_processor_types`.
    """
    client = documentai_v1beta3.DocumentProcessorServiceClient()

    # The full resource name of the location, e.g., projects/project_id/locations/location
    parent = client.common_location_path(project_id, location)

    processor = documentai_v1beta3.Processor(
        display_name=processor_display_name,
        type=processor_type_id,
    )

    try:
        print(
            f"Attempting to create processor '{processor_display_name}' of type "
            f"'{processor_type_id}' in {parent}..."
        )

        response = client.create_processor(parent=parent, processor=processor)

        print("Processor created successfully:")
        print(f"  Name: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Type: {response.type}")
        print(f"  State: {response.state.name}")

    except AlreadyExists as e:
        print(
            f"Error: A processor with display name '{processor_display_name}' "
            f"already exists in {parent}.\n"
        )
        print(
            f"Please choose a different display name or use the existing processor.\nDetails: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check the project ID, location, and ensure the processor type is "
            "valid and available."
        )
        print("Also, ensure the service account has the 'Document AI Editor' role.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentprocessorservice_processor_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Document AI processor.")
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us",
        help="The location of the processor (e.g., 'us' or 'eu').",
        required=True,
    )
    parser.add_argument(
        "--processor_display_name",
        type=str,
        help="The display name for the new processor.",
        required=True,
    )
    parser.add_argument(
        "--processor_type_id",
        type=str,
        help="The type of the processor (e.g., 'FORM_PARSER_PROCESSOR').",
        required=True,
    )

    args = parser.parse_args()

    create_document_processor(
        args.project_id,
        args.location,
        args.processor_display_name,
        args.processor_type_id,
    )
