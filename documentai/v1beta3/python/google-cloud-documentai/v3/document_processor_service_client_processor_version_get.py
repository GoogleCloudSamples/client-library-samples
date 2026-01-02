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

# [START documentai_v1beta3_documentprocessorservice_processorversion_get]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1beta3


def get_processor_version(
    project_id: str,
    location: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """
    Retrieves details about a specific Document AI processor version.

    This function demonstrates how to fetch the configuration and status of a
    Document AI processor version, including its display name, state, and
    creation time.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_id: The ID of the processor to which the version belongs.
        processor_version_id: The ID of the processor version to retrieve.
                              This can be a version number (e.g., "1") or "default".
    """
    client = documentai_v1beta3.DocumentProcessorServiceClient()

    name = client.processor_version_path(
        project_id, location, processor_id, processor_version_id
    )

    try:
        request = documentai_v1beta3.GetProcessorVersionRequest(name=name)

        processor_version = client.get_processor_version(request=request)

        print(f"Successfully retrieved processor version: {processor_version.name}")
        print(f"Display Name: {processor_version.display_name}")
        print(f"State: {processor_version.state.name}")
        print(f"Creation Time: {processor_version.create_time.isoformat()}")
        if processor_version.kms_key_name:
            print(f"KMS Key Name: {processor_version.kms_key_name}")
        if processor_version.document_schema:
            print(
                f"Document Schema Name: {processor_version.document_schema.display_name}"
            )

    except NotFound:
        print(
            f"Error: Processor version '{name}' not found. "
            "Please ensure the project ID, location, processor ID, and processor version ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentprocessorservice_processorversion_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves details about a specific Document AI processor version."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor (e.g., 'us', 'eu').",
        required=True,
    )
    parser.add_argument(
        "--processor_id",
        type=str,
        help="The ID of the processor to which the version belongs.",
        required=True,
    )
    parser.add_argument(
        "--processor_version_id",
        type=str,
        help="The ID of the processor version to retrieve (e.g., '1', 'default').",
        required=True,
    )

    args = parser.parse_args()

    get_processor_version(
        project_id=args.project_id,
        location=args.location,
        processor_id=args.processor_id,
        processor_version_id=args.processor_version_id,
    )
