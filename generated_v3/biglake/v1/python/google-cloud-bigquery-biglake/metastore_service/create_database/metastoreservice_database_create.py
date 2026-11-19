# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START biglake_v1_metastoreservice_database_create]
import google.api_core.exceptions
from google.cloud import bigquery_biglake_v1


def create_database(
    location_id: str, catalog_id: str, database_id: str, project_id: str
) -> None:
    """Creates a database in the specified BigLake catalog.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        catalog_id: The ID of the parent catalog.
        database_id: The caller-chosen ID to use for the database (for example,
          'example_database').
        project_id: The Google Cloud project ID.
    """
    client = bigquery_biglake_v1.MetastoreServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    )
    database = bigquery_biglake_v1.Database(
        type_=bigquery_biglake_v1.Database.Type.HIVE
    )

    try:
        response = client.create_database(
            parent=parent,
            database_id=database_id,
            database=database,
        )
        print(f"Created database: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create database: {error}")


# [END biglake_v1_metastoreservice_database_create]
