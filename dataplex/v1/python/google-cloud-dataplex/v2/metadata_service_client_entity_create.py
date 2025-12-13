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

# [START dataplex_v1_metadataservice_create_entity]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_entity(
    project_id: str,
    location: str,
    lake_id: str,
    zone_id: str,
    entity_id: str,
    asset_id: str,
    gcs_path: str,
) -> None:
    """
    Creates a metadata entity in a Dataplex zone.


    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us-central1").
        lake_id: The ID of the Dataplex lake.
        zone_id: The ID of the Dataplex zone within the lake.
        entity_id: The ID to use for the new entity. This will also be the
                   published table name.
        asset_id: The ID of the asset associated with the storage location
                  (e.g., a Cloud Storage bucket or folder within the zone).
        gcs_path: The Cloud Storage path where the entity's data resides,
                  e.g., "gs://my-bucket/my-data-folder".
    """
    client = dataplex_v1.MetadataServiceClient()

    zone_parent = client.zone_path(project_id, location, lake_id, zone_id)

    schema_fields = [
        dataplex_v1.Schema.SchemaField(
            name="id",
            type_=dataplex_v1.Schema.Type.INT64,
            mode=dataplex_v1.Schema.Mode.REQUIRED,
        ),
        dataplex_v1.Schema.SchemaField(
            name="name",
            type_=dataplex_v1.Schema.Type.STRING,
            mode=dataplex_v1.Schema.Mode.NULLABLE,
        ),
    ]

    entity = dataplex_v1.Entity(
        id=entity_id,
        type_=dataplex_v1.Entity.Type.TABLE,  # Example: creating a TABLE entity
        asset=asset_id,
        data_path=gcs_path,
        system=dataplex_v1.StorageSystem.CLOUD_STORAGE,  # Data stored in GCS
        format_=dataplex_v1.StorageFormat(
            mime_type="application/x-parquet"  # Example: Parquet format
        ),
        schema=dataplex_v1.Schema(
            user_managed=True,  # Set to True if you want to fully manage the schema
            fields=schema_fields,
        ),
        display_name=f"My Sample Entity {entity_id}",
        description="A sample entity created via Dataplex API",
    )

    request = dataplex_v1.CreateEntityRequest(
        parent=zone_parent,
        entity=entity,
    )

    try:
        print(f"Creating entity {entity_id} in zone {zone_id}...")
        response = client.create_entity(request=request)
        print(f"Successfully created entity: {response.name}")
        print(f"Entity ID: {response.id}")
        print(f"Entity Type: {dataplex_v1.Entity.Type(response.type_).name}")
        print(f"Data Path: {response.data_path}")
        print(f"Schema fields: {[field.name for field in response.schema.fields]}")
    except exceptions.AlreadyExists as e:
        print(f"Error: Entity '{entity_id}' already exists in zone '{zone_id}'.")
        print(
            f"Please use a unique entity ID or update the existing entity if intended."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_metadataservice_create_entity]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a metadata entity in a Dataplex zone."
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
        default="us-central1",
        help="The Google Cloud region (e.g., 'us-central1').",
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
        "--entity_id",
        type=str,
        required=True,
        help="The ID to use for the new entity. This will also be the published table name.",
    )
    parser.add_argument(
        "--asset_id",
        type=str,
        required=True,
        help="The ID of the asset associated with the storage location (e.g., a Cloud Storage bucket or folder within the zone).",
    )
    parser.add_argument(
        "--gcs_path",
        type=str,
        required=True,
        help="The Cloud Storage path where the entity's data resides, e.g., 'gs://my-bucket/my-data-folder'.",
    )
    args = parser.parse_args()

    create_entity(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        zone_id=args.zone_id,
        entity_id=args.entity_id,
        asset_id=args.asset_id,
        gcs_path=args.gcs_path,
    )
