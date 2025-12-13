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

# [START documentai_v1beta3_documentprocessorservice_processorversions_list]
from google.api_core import exceptions
from google.cloud import documentai_v1beta3


def list_processor_versions(
    project_id: str,
    location: str,
    processor_id: str,
) -> None:
    """Lists all versions of a Document AI processor.

    Document AI processors can have multiple versions, allowing you to train
    and deploy different models for various use cases or to iterate on model
    improvements. This sample demonstrates how to list all available versions
    for a specific processor, including details like their state and evaluation
    metrics.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_id: The ID of the processor to list versions for.
    """

    client = documentai_v1beta3.DocumentProcessorServiceClient()

    parent = client.processor_path(project_id, location, processor_id)

    print(f"Listing processor versions for processor: {parent}")

    try:

        page_result = client.list_processor_versions(parent=parent)

        if not page_result:
            print("No processor versions found.")
        else:
            for version in page_result:
                print("------------------------------------")
                print(f"Processor Version Name: {version.name}")
                print(f"  Display Name: {version.display_name}")
                print(f"  State: {version.state.name}")
                print(f"  Create Time: {version.create_time}")
                if version.latest_evaluation:
                    print(f"  Latest Evaluation: {version.latest_evaluation.name}")
                else:
                    print("  Latest Evaluation: N/A")

    except exceptions.NotFound:
        print(f"Error: Processor '{processor_id}' not found in location '{location}'.")
        print("Please ensure the processor ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please check the error message and refer to the Document AI documentation for troubleshooting."
        )


# [END documentai_v1beta3_documentprocessorservice_processorversions_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all versions of a Document AI processor."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location of the processor (e.g., 'us').",
        required=True,
    )
    parser.add_argument(
        "--processor_id",
        type=str,
        help="The ID of the processor to list versions for.",
        required=True,
    )

    args = parser.parse_args()

    list_processor_versions(args.project_id, args.location, args.processor_id)
