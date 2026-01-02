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

# [START documentai_v1_documentprocessorservice_processor_delete]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1


def delete_document_processor(
    project_id: str, location: str, processor_id: str
) -> None:
    """
    Deletes a Document AI processor.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us" or "eu").
        processor_id: The ID of the processor to delete.
    """
    client = documentai_v1.DocumentProcessorServiceClient()

    processor_name = client.processor_path(project_id, location, processor_id)

    print(f"Attempting to delete processor: {processor_name}")

    try:
        operation = client.delete_processor(name=processor_name)

        operation.result()

        print(f"Successfully deleted processor: {processor_name}")
    except NotFound:
        print(
            f"Error: Processor '{processor_name}' not found. "
            "Please ensure the processor ID and location are correct."
        )
    except Exception as e:
        print(f"An error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processor_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Document AI processor.")
    parser.add_argument("project_id", help="The Google Cloud project ID.")
    parser.add_argument(
        "location", help="The location of the processor (e.g., 'us' or 'eu')."
    )
    parser.add_argument("processor_id", help="The ID of the processor to delete.")
    args = parser.parse_args()

    delete_document_processor(args.project_id, args.location, args.processor_id)
