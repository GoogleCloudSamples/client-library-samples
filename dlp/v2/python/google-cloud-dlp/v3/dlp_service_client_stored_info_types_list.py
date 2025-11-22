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

# [START dlp_v2_dlpservice_storedinfotypes_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import dlp_v2


def list_stored_info_types(project_id: str, location: str) -> None:
    """Lists stored infoTypes.

    This sample demonstrates how to list all stored infoTypes for a given
    project and location. Stored infoTypes are custom detectors that can be
    reused across multiple DLP operations.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location to list stored infoTypes from (e.g., 'global', 'us-central1').
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_stored_info_types(parent=parent)

        found_any = False
        for stored_info_type in response:
            found_any = True
            print(f"  Stored InfoType Name: {stored_info_type.name}")
            if stored_info_type.current_version.display_name:
                print(
                    f"    Display Name: {stored_info_type.current_version.display_name}"
                )
            if stored_info_type.current_version.description:
                print(
                    f"    Description: {stored_info_type.current_version.description}"
                )
            print(f"    State: {stored_info_type.current_version.state.name}")
            create_time_dt = stored_info_type.current_version.create_time.datetime
            print(f"    Created: {create_time_dt.strftime('%Y-%m-%d %H:%M:%S UTC')}")
            print("----")

        if not found_any:
            print("No stored infoTypes found.")

    except NotFound as e:
        print(f"Error: The parent resource '{parent}' was not found.")
        print(
            "Please ensure the project ID and location are correct and that the DLP API is enabled."
        )
        print(f"Details: {e}")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e.code} - {e.message}")
        print("Please check your input parameters and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_storedinfotypes_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists stored infoTypes in a specified Google Cloud project and location."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location to list stored infoTypes from (e.g., 'global', 'us-central1').",
    )
    args = parser.parse_args()
    list_stored_info_types(args.project_id, args.location)
