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

# [START dataplex_v1_dataplexservice_assets_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_assets(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """
    Lists asset resources within a specified zone in Google Cloud Dataplex.

    Args:
        project_id: The Google Cloud project ID.
        location: The Cloud region where the lake and zone are located (e.g., "us-central1").
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource within the lake.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = client.zone_path(project_id, location, lake_id, zone_id)

    print(f"Listing assets for zone: {parent}")

    try:
        request = dataplex_v1.ListAssetsRequest(parent=parent)

        page_result = client.list_assets(request=request)

        found_assets = False
        for asset in page_result:
            found_assets = True
            print(f"  Asset Name: {asset.name}")
            print(f"  Asset Display Name: {asset.display_name}")
            print(f"  Asset State: {asset.state.name}")
            print(f"  Asset Type: {asset.resource_spec.type_.name}")
            print("---")

        if not found_assets:
            print(f"No assets found in zone: {zone_id}")

    except exceptions.NotFound:
        print(
            f"Error: The specified zone '{zone_id}' or its parent lake/project/location "
            f"was not found. Please ensure the resource path '{parent}' is correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_assets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Lists assets within a Dataplex zone.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Cloud region where the lake and zone are located.",
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
    list_assets(args.project_id, args.location, args.lake_id, args.zone_id)
