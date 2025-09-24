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

# [START dataplex_v1_metadataservice_entity_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_entity(
    project_id: str,
    location_id: str,
    lake_id: str,
    zone_id: str,
    entity_id: str,
) -> None:
    """
    Retrieves a metadata entity from a Dataplex zone.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource.
        entity_id: The ID of the entity to retrieve.
    """
    client = dataplex_v1.MetadataServiceClient()

    name = client.entity_path(
        project=project_id,
        location=location_id,
        lake=lake_id,
        zone=zone_id,
        entity=entity_id,
    )

    request = dataplex_v1.GetEntityRequest(name=name)

    try:
        entity = client.get_entity(request=request)
        print(f"Successfully retrieved entity: {entity.name}")
        print(f"Entity ID: {entity.id}")
        print(f"Entity Type: {entity.type_.name}")
        print(f"Entity Data Path: {entity.data_path}")
    except exceptions.NotFound:
        print(f"Error: Entity '{name}' not found.")
        print(
            "Please ensure the entity ID, zone ID, lake ID, location ID, and project ID are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_metadataservice_entity_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Dataplex metadata entity."
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
        help="The ID of the lake resource.",
    )
    parser.add_argument(
        "--zone_id",
        type=str,
        required=True,
        help="The ID of the zone resource.",
    )
    parser.add_argument(
        "--entity_id",
        type=str,
        required=True,
        help="The ID of the entity to retrieve.",
    )

    args = parser.parse_args()

    get_entity(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        entity_id=args.entity_id,
    )
