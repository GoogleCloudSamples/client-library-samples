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

# [START documentai_v1_documentprocessorservice_processorversion_get]
from google.api_core.exceptions import NotFound
from google.cloud import documentai_v1 as documentai


def get_processor_version(
    project_id: str,
    location: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """
    Retrieves details about a specific processor version.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the processor (e.g., "us").
        processor_id: The ID of the processor to which the version belongs.
        processor_version_id: The ID of the processor version to retrieve.
    """
    client = documentai.DocumentProcessorServiceClient()

    name = client.processor_version_path(
        project_id,
        location,
        processor_id,
        processor_version_id,
    )

    try:
        processor_version = client.get_processor_version(name=name)

        print(f"Processor Version Name: {processor_version.name}")
        print(f"Display Name: {processor_version.display_name}")
        print(f"State: {processor_version.state.name}")
        print(f"Create Time: {processor_version.create_time.isoformat()}")
        if processor_version.latest_evaluation:
            print(
                "Latest Evaluation: "
                f"{processor_version.latest_evaluation.metrics.f1_score:.2f} F1 Score"
            )

    except NotFound:
        print(f"Processor version {name} not found.")
        print(
            "Please ensure the project ID, location, processor ID, and version ID are correct "
            "and that the processor version exists in the specified location."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END documentai_v1_documentprocessorservice_processorversion_get]

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Get details about a specific Document AI processor version."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us",
        help="The location of the processor (e.g., 'us', 'eu').",
        required=True,
    )
    parser.add_argument(
        "--processor_id",
        type=str,
        help="The ID of the processor (e.g., 'a1b2c3d4e5f6g7h8').",
        required=True,
    )
    parser.add_argument(
        "--processor_version_id",
        type=str,
        help="The ID of the processor version (e.g., 'pretrained-ocr-v1.0' or '1').",
        required=True,
    )

    args = parser.parse_args()

    get_processor_version(
        args.project_id,
        args.location,
        args.processor_id,
        args.processor_version_id,
    )
