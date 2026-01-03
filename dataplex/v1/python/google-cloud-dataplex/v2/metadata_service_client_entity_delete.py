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

# [START dataplex_v1_metadataservice_entity_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_dataplex_entity(
    project_id: str, location_id: str, lake_id: str, zone_id: str, entity_id: str
) -> None:
    """Deletes a metadata entity from a Dataplex zone.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the Dataplex lake.
        zone_id: The ID of the Dataplex zone.
        entity_id: The ID of the entity to delete.
    """
    client = dataplex_v1.MetadataServiceClient()

    entity_name = client.entity_path(
        project=project_id,
        location=location_id,
        lake=lake_id,
        zone=zone_id,
        entity=entity_id,
    )

    try:
        # Retrieve entity first
        request = dataplex_v1.GetEntityRequest(name=entity_name)
        entity = client.get_entity(request=request)

        # Use the entity's etag in the deletion
        request = dataplex_v1.DeleteEntityRequest(name=entity_name, etag=entity.etag)

        client.delete_entity(request=request)
        print(f"Successfully deleted entity: {entity_name}")
    except exceptions.NotFound:
        print(f"Entity '{entity_name}' not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting entity '{entity_name}': {e}")


# [END dataplex_v1_metadataservice_entity_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a metadata entity from a Dataplex zone."
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
        help="The ID of the Dataplex zone.",
    )
    parser.add_argument(
        "--entity_id",
        type=str,
        required=True,
        help="The ID of the entity to delete.",
    )
    args = parser.parse_args()

    delete_dataplex_entity(
        project_id=args.project_id,
        location_id=args.location_id,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        entity_id=args.entity_id,
    )
