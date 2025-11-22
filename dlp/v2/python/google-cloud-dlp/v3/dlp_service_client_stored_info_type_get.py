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

# [START dlp_v2_dlpservice_storedinfotype_get]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2 as dlp


def get_stored_info_type(
    project_id: str,
    location: str,
    stored_info_type_id: str,
) -> None:
    """
    Gets a stored infoType.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to run the API call.
        stored_info_type_id: The ID of the stored infoType to retrieve.
    """
    client = dlp.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/storedInfoTypes/{stored_info_type_id}"

    try:
        stored_info_type = client.get_stored_info_type(name=name)

        print(f"Successfully retrieved stored infoType: {stored_info_type.name}")
        print(f"Display Name: {stored_info_type.current_version.config.display_name}")
        print(f"Description: {stored_info_type.current_version.config.description}")

    except NotFound:
        print(f"Error: Stored infoType '{stored_info_type_id}' not found at {name}.")
        print("Please ensure the stored infoType ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_storedinfotype_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieve a specific stored infoType.")

    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to run the API call (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--stored_info_type_id",
        required=True,
        type=str,
        help="The ID of the stored info type to retrieve.",
    )
    args = parser.parse_args()

    get_stored_info_type(
        args.project_id,
        args.location,
        args.stored_info_type_id,
    )
