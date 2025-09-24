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

# [START dataplex_v1_dataplexservice_zoneactions_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_zone_actions(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """Lists actions that require attention for a given Dataplex zone.


    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region where the lake and zone are located.
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource within the lake.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent_zone_name = client.zone_path(project_id, location, lake_id, zone_id)

    try:
        request = dataplex_v1.ListZoneActionsRequest(parent=parent_zone_name)

        page_result = client.list_zone_actions(request=request)

        print(f"Actions for zone '{zone_id}' in lake '{lake_id}':")
        found_actions = False
        for action in page_result:
            found_actions = True
            print(f"- Action Name: {action.name}")
            print(f"  Category: {action.category.name}")
            print(f"  Issue: {action.issue}")
            if action.detect_time:
                print(f"  Detected: {action.detect_time.isoformat()}")
            print("----------------------------------------")

        if not found_actions:
            print(f"No actions found for zone '{zone_id}'.")
        else:
            print(f"Successfully listed actions for zone '{zone_id}'.")

    except exceptions.NotFound:
        print(f"Error: The specified zone '{parent_zone_name}' was not found.")
        print(
            "Please ensure the project ID, location, lake ID, and zone ID are correct and the zone exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred while listing zone actions: {e}")


# [END dataplex_v1_dataplexservice_zoneactions_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Lists actions for a Dataplex zone.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the lake and zone are located.",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake resource.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone resource within the lake.",
    )

    args = parser.parse_args()
    list_zone_actions(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
    )
