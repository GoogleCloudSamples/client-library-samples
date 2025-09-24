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

# [START dataplex_v1_dataplexservice_asset_create]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_dataplex_asset(
    project_id: str,
    location_id: str,
    lake_id: str,
    zone_id: str,
    asset_id: str,
    resource_name: str,
    resource_type: str,
) -> None:
    """
    Creates a Dataplex asset within a specified zone.


    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the Dataplex lake.
        zone_id: The ID of the Dataplex zone within the lake.
        asset_id: The ID of the asset to create.
        resource_name: The full resource name of the cloud resource to be linked.
            For example, for a BigQuery dataset:
            'projects/{project_id}/datasets/{dataset_id}'.
            For a Cloud Storage bucket:
            'projects/{project_id}/buckets/{bucket_id}'.
        resource_type: The type of the resource, either 'STORAGE_BUCKET' or 'BIGQUERY_DATASET'.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = client.zone_path(project_id, location_id, lake_id, zone_id)

    asset = dataplex_v1.Asset(
        display_name=f"My Assert for {asset_id}",
        description=f"Description for my asset {asset_id}",
        resource_spec=dataplex_v1.Asset.ResourceSpec(
            name=resource_name,
            type_=dataplex_v1.Asset.ResourceSpec.Type[resource_type],
        ),
    )

    request = dataplex_v1.CreateAssetRequest(
        parent=parent,
        asset_id=asset_id,
        asset=asset,
    )

    try:
        operation = client.create_asset(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()
        print(f"Created Dataplex asset: {response.name}")

    except exceptions.AlreadyExists as e:
        print(f"Asset '{asset_id}' already exists. Skipping creation.")
    except exceptions.NotFound as e:
        print(
            f"Error: Parent resource not found. Ensure lake '{lake_id}' and zone '{zone_id}' exist."
        )
    except Exception as e:
        print(f"Error creating Dataplex asset: {e}")


# [END dataplex_v1_dataplexservice_asset_create]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Dataplex asset within a specified zone."
    )
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
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the Dataplex lake.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the Dataplex zone within the lake.",
    )
    parser.add_argument(
        "--asset_id",
        type=str,
        required=True,
        help="The ID of the asset to create. Must be unique within the zone.",
    )
    parser.add_argument(
        "--resource_name",
        type=str,
        required=True,
        help="The full resource name of the cloud resource to be linked. "
        "E.g., 'projects/{project_id}/datasets/{dataset_id}' for BigQuery, "
        "or 'projects/{project_id}/buckets/{bucket_id}' for Cloud Storage.",
    )
    parser.add_argument(
        "--resource_type",
        type=str,
        required=True,
        choices=["STORAGE_BUCKET", "BIGQUERY_DATASET"],
        help="The type of the resource, either 'STORAGE_BUCKET' or 'BIGQUERY_DATASET'.",
    )

    args = parser.parse_args()

    create_dataplex_asset(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        asset_id=args.asset_id,
        resource_name=args.resource_name,
        resource_type=args.resource_type,
    )
