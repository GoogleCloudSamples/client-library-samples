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

# [START documentai_v1_documentprocessorservice_processorversions_list]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1 as documentai


def list_processor_versions(
    project_id: str,
    location: str,
    processor_id: str,
) -> None:
    """
    Lists all processor versions for a given processor.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_id: The ID of the processor to list versions for.
    """
    client = documentai.DocumentProcessorServiceClient()

    parent = client.processor_path(project_id, location, processor_id)

    print(f"Listing processor versions for processor: {parent}")

    try:
        page_result = client.list_processor_versions(parent=parent)

        if not page_result.processor_versions:
            print("No processor versions found.")
        else:
            for version in page_result:
                print("------------------------------------")
                print(f"Processor Version Name: {version.name}")
                print(f"  Display Name: {version.display_name}")
                print(f"  State: {version.state.name}")
                if version.create_time:
                    print(f"  Create Time: {version.create_time.isoformat()}")
                if version.latest_evaluation:
                    print(f"  Latest Evaluation: {version.latest_evaluation.name}")
    except NotFound as e:
        print(f"Error: The specified processor was not found: {e}")
        print("Please ensure the project ID, location, and processor ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processorversions_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all processor versions for a given processor."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
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
        help="The ID of the processor to list versions for.",
        required=True,
    )

    args = parser.parse_args()

    list_processor_versions(args.project_id, args.location, args.processor_id)
