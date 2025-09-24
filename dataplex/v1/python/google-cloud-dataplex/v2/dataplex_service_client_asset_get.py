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

# [START dataplex_v1_dataplexservice_get_asset]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_dataplex_asset(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
    asset_id: str,
) -> None:
    """
    Retrieves a Dataplex asset.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake is located.
        lake_id: The ID of the lake.
        zone_id: The ID of the zone within the lake.
        asset_id: The ID of the asset to retrieve.
    """
    client = dataplex_v1.DataplexServiceClient()

    asset_name = client.asset_path(project_id, location, lake_id, zone_id, asset_id)

    try:
        asset = client.get_asset(name=asset_name)

        print(f"Retrieved asset: {asset.name}")
        print(f"  Display Name: {asset.display_name}")
        print(f"  Description: {asset.description}")
        print(f"  Type: {asset.resource_spec.type_.name}")
        print(f"  Resource Name: {asset.resource_spec.name}")
        print(f"  State: {asset.state.name}")

    except exceptions.NotFound:
        print(f"Error: Asset '{asset_name}' not found.")
        print(
            "Please ensure the project ID, location, lake ID, zone ID, and asset ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_get_asset]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieves a Dataplex asset.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the lake is located (e.g., 'us-central1').",
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
        help="The ID of the asset to retrieve. ",
    )
    args = parser.parse_args()

    get_dataplex_asset(
        args.project_id,
        args.location,
        args.lake_id,
        args.zone_id,
        args.asset_id,
    )
