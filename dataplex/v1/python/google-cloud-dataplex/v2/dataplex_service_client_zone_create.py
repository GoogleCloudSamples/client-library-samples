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

# [START dataplex_v1_dataplexservice_zone_create]
from google.api_core import exceptions
from google.cloud import dataplex_v1
from google.cloud.dataplex_v1.types import resources


def create_zone(
    project_id: str,
    location_id: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """
    Creates a Dataplex zone resource within a specified lake.


    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the lake to create the zone in.
        zone_id: The ID of the zone to create.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = client.lake_path(project_id, location_id, lake_id)

    zone = resources.Zone(
        display_name=f"My Curated Zone {zone_id}",
        description="A curated zone for refined data assets.",
        type_=resources.Zone.Type.CURATED,  # Can be RAW or CURATED
        resource_spec=resources.Zone.ResourceSpec(
            location_type=resources.Zone.ResourceSpec.LocationType.MULTI_REGION
            # Can be SINGLE_REGION or MULTI_REGION
        ),
    )

    try:
        operation = client.create_zone(parent=parent, zone_id=zone_id, zone=zone)

        print(f"Waiting for operation to complete: {operation.operation.name}")

        response = operation.result()
        print(f"Created zone: {response.name}")
        print(f"Zone type: {response.type_.name}")
        print(f"Zone resource location type: {response.resource_spec.location_type.name}")

    except exceptions.AlreadyExists as e:
        print(f"Zone '{zone_id}' already exists in lake '{lake_id}'. Error: {e}")
    except Exception as e:
        print(f"Error creating zone '{zone_id}': {e}")


# [END dataplex_v1_dataplexservice_zone_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Dataplex zone within a specified lake."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
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
        help="The ID of the lake to create the zone in.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help=("The ID of the zone to create."),
    )

    args = parser.parse_args()

    create_zone(args.project_id, args.location_id, args.lake_id, args.zone_id)
