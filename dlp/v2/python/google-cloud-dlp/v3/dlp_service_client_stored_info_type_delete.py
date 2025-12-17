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

# [START dlp_v2_dlpservice_storedinfotype_delete]
from google.api_core.exceptions import NotFound
from google.cloud import dlp_v2


def delete_stored_info_type(
    project_id: str, location: str, stored_info_type_id: str
) -> None:
    """Deletes a stored infoType.

    Args:
        project_id: The Google Cloud project ID to use.
        location: The geographic region to use, e.g. "global", "us-central1".
        stored_info_type_id: The ID of the stored infoType to delete.
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/storedInfoTypes/{stored_info_type_id}"

    try:
        client.delete_stored_info_type(name=name)
        print(f"Successfully deleted stored infoType: {name}")
    except NotFound:
        print(f"Stored infoType {name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"An error occurred while deleting stored infoType {name}: {e}")


# [END dlp_v2_dlpservice_storedinfotype_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a stored infoType in Google Cloud DLP."
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
        help="The ID of the stored info type to delete.",
    )
    args = parser.parse_args()

    delete_stored_info_type(
        args.project_id, args.location, args.stored_info_type_id
    )
