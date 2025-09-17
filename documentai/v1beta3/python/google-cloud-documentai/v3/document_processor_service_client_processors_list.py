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

# [START documentai_v1beta3_documentprocessorservice_processors_list]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1beta3


def list_processors(project_id: str, location: str) -> None:
    """
    Lists all processors in a given Google Cloud project and location.

    This function demonstrates how to retrieve a list of Document AI processors
    that are available in a specific project and geographic location.
    Processors are the core components in Document AI that perform tasks
    like OCR, form parsing, or specialized document understanding.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us", "us-central1").
    """
    client = documentai_v1beta3.DocumentProcessorServiceClient()

    parent = client.common_location_path(project_id, location)

    print(f"Listing processors in {parent}...")

    try:
        page_result = client.list_processors(parent=parent)

        if not page_result:
            print(f"No processors found in {parent}.")
        else:
            for processor in page_result:
                print(f"Processor Name: {processor.name}")
                print(f"  Display Name: {processor.display_name}")
                print(f"  Type: {processor.type}")
                print(f"  State: {processor.state.name}")
                if processor.default_processor_version:
                    print(
                        "  Default Version: "
                        f"{processor.default_processor_version.split('/')[-1]}"
                    )
                print("\n")

    except NotFound as e:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' was not found."
        )
        print(
            f"Please ensure the project ID and location are correct and that Document AI API is enabled.\nDetails: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1beta3_documentprocessorservice_processors_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Document AI processors in a project and location."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The Google Cloud location (e.g., 'us', 'us-central1').",
        required=True,
    )

    args = parser.parse_args()

    # To run the sample, replace 'YOUR_PROJECT_ID' with your actual project ID
    # and optionally change the location.
    # Example: python your_script_name.py --project_id my-gcp-project --location us-central1
    list_processors(args.project_id, args.location)
