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

# [START dataplex_v1_dataplexservice_assetactions_list]
from google.api_core import exceptions as core_exceptions
from google.cloud import dataplex_v1


def list_asset_actions(
    project_id: str, location: str, lake_id: str, zone_id: str, asset_id: str
) -> None:
    """
    Lists action resources in an asset.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us-central1").
        lake_id: The ID of the lake.
        zone_id: The ID of the zone within the lake.
        asset_id: The ID of the asset within the zone.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = client.asset_path(project_id, location, lake_id, zone_id, asset_id)

    request = dataplex_v1.ListAssetActionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_asset_actions(request=request)

        print(f"Listing actions for asset: {parent}")
        found_actions = False
        for response in page_result:
            found_actions = True
            print(f"Action: {response.name}")
            print(f"  Category: {response.category.name}")
            print(f"  Type: {response.issue.type_}")
            print(f"  Description: {response.issue.description}")
            print(f"  State: {response.state.name}")
            print("---")

        if not found_actions:
            print(f"  No actions found for asset: {parent}")

    except core_exceptions.NotFound:
        print(f"Error: The specified asset '{parent}' was not found.")
        print(
            "Please ensure the project ID, location, lake ID, zone ID, and asset ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_assetactions_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists action resources in a Dataplex asset."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone within the lake.",
    )
    parser.add_argument(
        "--asset_id",
        type=str,
        required=True,
        help="The ID of the asset within the zone.",
    )
    args = parser.parse_args()

    list_asset_actions(
        args.project_id,
        args.location,
        args.lake_id,
        args.zone_id,
        args.asset_id,
    )
