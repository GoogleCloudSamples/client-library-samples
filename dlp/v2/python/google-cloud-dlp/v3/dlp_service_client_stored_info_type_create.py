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

# [START dlp_v2_dlpservice_storedinfotype_create]
from google.api_core.exceptions import AlreadyExists
from google.cloud import dlp_v2


def create_stored_info_type(
    project_id: str,
    location: str,
    stored_info_type_id: str,
) -> None:
    """Creates a pre-built stored infoType based on a regular expression.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The Google Cloud location (region) to run the API call.
            Can be 'global', 'us-central1', etc.
        stored_info_type_id: The ID of the stored info type to create.
            This ID must be unique within the project and location.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    # Define the regex pattern for the custom info type
    # For example, a pattern for a custom ID like "AA12345"
    regex_pattern = r"[A-Z]{2}\d{5}"

    config = dlp_v2.StoredInfoTypeConfig(
        regex=dlp_v2.CustomInfoType.Regex(pattern=regex_pattern),
    )

    request = dlp_v2.CreateStoredInfoTypeRequest(
        parent=parent,
        config=config,
        stored_info_type_id=stored_info_type_id,
    )

    try:
        response = client.create_stored_info_type(request=request)
        print(f"Successfully created stored info type: {response.name}")
    except AlreadyExists as e:
        print(
            f"Error: Stored info type '{stored_info_type_id}' already exists in {parent}. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END dlp_v2_dlpservice_storedinfotype_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a custom stored info type based on a regex pattern."
    )
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
        help="The ID of the stored info type to create.",
    )
    args = parser.parse_args()

    create_stored_info_type(
        args.project_id,
        args.location,
        args.stored_info_type_id,
    )
