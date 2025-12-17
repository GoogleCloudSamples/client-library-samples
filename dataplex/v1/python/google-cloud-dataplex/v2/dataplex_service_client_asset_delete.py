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

# [START dataplex_v1_dataplexservice_asset_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_dataplex_asset(
    project_id: str,
    location_id: str,
    lake_id: str,
    zone_id: str,
    asset_id: str,
) -> None:
    """
    Deletes a Dataplex asset.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g. 'us-central1').
        lake_id: The ID of the lake.
        zone_id: The ID of the zone.
        asset_id: The ID of the asset to delete.
    """
    client = dataplex_v1.DataplexServiceClient()

    asset_name = client.asset_path(project_id, location_id, lake_id, zone_id, asset_id)

    request = dataplex_v1.DeleteAssetRequest(name=asset_name)

    try:
        operation = client.delete_asset(request=request)

        print(f"Waiting for operation to complete: {operation.operation.name}")
        operation.result()

        print(f"Asset {asset_name} deleted successfully.")

    except exceptions.NotFound:
        print(f"Asset {asset_name} not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting asset {asset_name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_asset_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataplex asset.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g. 'us-central1').",
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
        help="The ID of the zone.",
    )
    parser.add_argument(
        "--asset_id",
        type=str,
        required=True,
        help="The ID of the asset to delete.",
    )
    args = parser.parse_args()

    delete_dataplex_asset(
        args.project_id,
        args.location_id,
        args.lake_id,
        args.zone_id,
        args.asset_id,
    )
