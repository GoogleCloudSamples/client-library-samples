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

# [START dataplex_v1_dataplexservice_zone_get]
from google.cloud import dataplex_v1
from google.api_core import exceptions


def get_dataplex_zone(
    project_id: str, location_id: str, lake_id: str, zone_id: str
) -> None:
    """
    Retrieves a Dataplex zone resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource to retrieve.
    """
    client = dataplex_v1.DataplexServiceClient()

    zone_name = client.zone_path(project_id, location_id, lake_id, zone_id)

    request = dataplex_v1.GetZoneRequest(
        name=zone_name,
    )

    try:
        zone = client.get_zone(request=request)

        print(f"Successfully retrieved zone: {zone.name}")
        print(f"Display Name: {zone.display_name}")
        print(f"Type: {zone.type_.name}")
        print(f"State: {zone.state.name}")

    except exceptions.NotFound:
        print(
            f"Error: Zone '{zone_name}' not found. "
            "Please check the project ID, location, lake ID, and zone ID."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_zone_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieves a Dataplex zone.")
    parser.add_argument(
        "--project_id", type=str, required=True, help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "--location_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id", type=str, required=True, help="The ID of the lake resource."
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone resource to retrieve.",
    )

    args = parser.parse_args()

    get_dataplex_zone(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
    )
