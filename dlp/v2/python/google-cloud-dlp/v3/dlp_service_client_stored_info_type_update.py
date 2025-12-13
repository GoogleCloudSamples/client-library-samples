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

# [START dlp_v2_dlpservice_storedinfotype_update]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import dlp_v2
from google.protobuf import field_mask_pb2


def update_stored_info_type(
    project_id: str, location: str, stored_info_type_id: str
) -> None:
    """
    Updates a stored info type by creating a new version.

    The `update_stored_info_type` method updates the metadata (display name,
    description) of an existing stored info type.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region to run the API call.
            (e.g., 'us-central1').
        stored_info_type_id: The ID of the stored info type to update.
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/storedInfoTypes/{stored_info_type_id}"

    # Define the new display name and description for the stored info type.
    new_display_name = f"Updated Display Name for {stored_info_type_id}"
    new_description = "This is an updated description for the stored info type."

    updated_config = dlp_v2.StoredInfoTypeConfig(
        display_name=new_display_name,
        description=new_description,
    )

    # Create a field mask to specify which fields of the StoredInfoTypeConfig
    # are being updated. Only fields specified in the mask will be modified.
    # If the stored info type's definition (e.g., large_custom_dictionary) is
    # also being updated, its path should be included here (e.g., "large_custom_dictionary").
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    try:
        response = client.update_stored_info_type(
            name=name, config=updated_config, update_mask=update_mask
        )
        print(f"Successfully updated stored info type: {response.name}")
        print(f"New Display Name: {response.current_version.config.display_name}")
        print(f"New Description: {response.current_version.config.description}")
    except NotFound:
        print(
            f"Error: Stored info type '{stored_info_type_id}' not found at '{name}'. "
            "Please ensure the ID and location are correct."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            f"Failed to update stored info type '{stored_info_type_id}'. "
            "Check the request parameters and permissions."
        )
    except Exception as e:
        print(
            f"An unexpected error occurred while updating stored info type '{stored_info_type_id}'."
        )


# [END dlp_v2_dlpservice_storedinfotype_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing DLP stored info type."
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
        help="The ID of the stored info type to update.",
    )
    args = parser.parse_args()

    update_stored_info_type(args.project_id, args.location, args.stored_info_type_id)
