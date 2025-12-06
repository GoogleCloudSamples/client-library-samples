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

# [START dataplex_v1_dataplexservice_update_asset]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_dataplex_asset(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
    asset_id: str,
) -> None:
    """
    Updates an existing Dataplex asset's description.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake and zone are located.
        lake_id: The ID of the lake containing the zone.
        zone_id: The ID of the zone containing the asset.
        asset_id: The ID of the asset to update.
    """
    client = dataplex_v1.DataplexServiceClient()

    asset_name = client.asset_path(project_id, location, lake_id, zone_id, asset_id)

    # Construct the Asset object with the desired updates.
    # Only fields specified in the update_mask will be updated.
    asset = dataplex_v1.Asset(
        name=asset_name,
        description="My updated asset description",
    )

    # Create a FieldMask to specify which fields of the asset should be updated.
    # In this case, we are only updating the 'description' field.
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        request = dataplex_v1.UpdateAssetRequest(
            asset=asset,
            update_mask=update_mask,
        )

        operation = client.update_asset(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()

        print(f"Asset updated: {response.name}")
        print(f"New description: {response.description}")
        print(f"Asset state: {response.state.name}")

    except exceptions.NotFound:
        print(f"Error: Asset {asset_name} not found.")
        print(
            "Please ensure the project ID, location, lake ID, zone ID, and asset ID are correct."
        )
    except exceptions.Conflict:
        print(f"Error: A conflict occurred while updating asset {asset_name}.")
        print(
            "This might happen if the resource is being modified by another operation."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    # [END dataplex_v1_dataplexservice_update_asset]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Dataplex asset's description."
    )
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
        help="The Google Cloud region where the lake and zone are located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake containing the zone.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone containing the asset.",
    )
    parser.add_argument(
        "--asset_id",
        type=str,
        required=True,
        help="The ID of the asset to update.",
    )

    args = parser.parse_args()

    update_dataplex_asset(
        args.project_id,
        args.location,
        args.lake_id,
        args.zone_id,
        args.asset_id,
    )
