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

# [START dataplex_v1_dataplexservice_update_zone]
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2
from google.api_core import exceptions


def update_dataplex_zone(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
) -> None:
    """
    Updates a Dataplex zone with a new display name and description.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake and zone are located.
        lake_id: The ID of the lake that contains the zone.
        zone_id: The ID of the zone to update.
    """
    client = dataplex_v1.DataplexServiceClient()

    zone_name = client.zone_path(project_id, location, lake_id, zone_id)

    updated_zone = dataplex_v1.Zone(
        name=zone_name,
        display_name="My new display name for my zone",
        description="The new description for my zone",
    )

    # Create a FieldMask to specify which fields of the Zone object to update.
    # This ensures that only the display_name and description are modified,
    # leaving other fields unchanged.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "description"])

    request = dataplex_v1.UpdateZoneRequest(
        zone=updated_zone,
        update_mask=update_mask,
    )

    print(f"Updating Dataplex zone: {zone_name}...")
    try:
        operation = client.update_zone(request=request)
        response = operation.result()

        print(f"Zone updated successfully: {response.name}")
        print(f"New Display Name: {response.display_name}")
        print(f"New Description: {response.description}")

    except exceptions.NotFound:
        print(f"Error: Zone '{zone_name}' not found.")
        print(
            "Please ensure the project ID, location, lake ID, and zone ID are correct."
        )
    except exceptions.Conflict as e:
        print(f"Error: Conflict while updating zone '{zone_name}'. Details: {e}")
        print("This might happen if there's a concurrent update or an invalid state.")
        print("Please check the zone's current state and try again.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_dataplexservice_update_zone]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Dataplex zone's display name and description."
    )
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
        help="The Google Cloud region for the lake and zone (e.g., 'us-central1').",
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
        help="The ID of the zone to update.",
    )

    args = parser.parse_args()

    update_dataplex_zone(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
    )
