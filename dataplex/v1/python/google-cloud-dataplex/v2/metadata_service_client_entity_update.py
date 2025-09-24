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

# [START dataplex_v1_metadataservice_entity_update]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def update_dataplex_entity(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
    entity_id: str,
) -> None:
    """Updates an existing metadata entity in Google Cloud Dataplex.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., 'us-central1').
        lake_id: The ID of the lake resource.
        zone_id: The ID of the zone resource within the lake.
        entity_id: The ID of the entity to update.
        new_display_name: The new display name for the entity.
        new_description: The new description for the entity.
    """
    client = dataplex_v1.MetadataServiceClient()

    entity_name = client.entity_path(
        project=project_id,
        location=location,
        lake=lake_id,
        zone=zone_id,
        entity=entity_id,
    )

    new_display_name = "My New Entity Display Name"
    new_description = "My New Description"

    try:
        existing_entity = client.get_entity(name=entity_name)
        print(f"Fetched existing entity: {existing_entity.name}")

        updated_entity = dataplex_v1.Entity(
            name=existing_entity.name,
            id=existing_entity.id,
            display_name=new_display_name,
            description=new_description,
            type_=existing_entity.type_,
            asset=existing_entity.asset,
            data_path=existing_entity.data_path,
            data_path_pattern=existing_entity.data_path_pattern,
            system=existing_entity.system,
            format_=existing_entity.format_,
            schema=existing_entity.schema,
            etag=existing_entity.etag,  # Pass the etag for optimistic locking
        )

        request = dataplex_v1.UpdateEntityRequest(entity=updated_entity)
        operation_result = client.update_entity(request=request)

        print(f"Successfully updated entity: {operation_result.name}")
        print(f"New Display Name: {operation_result.display_name}")
        print(f"New Description: {operation_result.description}")

    except exceptions.NotFound:
        print(f"Error: Entity '{entity_name}' not found.")
        print("Please ensure the entity exists before attempting to update it.")
    except exceptions.FailedPrecondition as e:
        print(f"Error updating entity due to precondition failure: {e}")
        print(
            "This often indicates a mismatch in the entity's etag. "
            "The entity might have been modified by another process. "
            "Please retry the operation after fetching the latest entity state."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_metadataservice_entity_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Dataplex metadata entity.")
    parser.add_argument(
        "--project_id",
        type=str, required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,required=True,
        help="The Google Cloud region for the lake and zone.",
    )
    parser.add_argument(
        "--lake_id", type=str, required=True, help="The ID of your lake."
    )
    parser.add_argument(
        "--zone_id", type=str, required=True, help="The ID of your zone."
    )
    parser.add_argument(
        "--entity_id",
        type=str,required=True,
        help="The ID of the entity to update.",
    )

    args = parser.parse_args()
    update_dataplex_entity(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        entity_id=args.entity_id,
    )
