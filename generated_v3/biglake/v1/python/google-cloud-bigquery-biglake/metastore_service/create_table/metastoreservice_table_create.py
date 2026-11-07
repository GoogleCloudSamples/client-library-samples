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

# [START biglake_v1_metastoreservice_table_create]
import google.api_core.exceptions
from google.cloud import bigquery_biglake_v1

client = bigquery_biglake_v1.MetastoreServiceClient()


def create_table(
    location_id: str,
    catalog_id: str,
    database_id: str,
    table_id: str,
    project_id: str,
) -> None:
    """Creates a table in a BigLake database.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        catalog_id: The ID of the parent BigLake catalog.
        database_id: The ID of the parent BigLake database.
        table_id: The caller-specified ID to use for the table.
        project_id: The Google Cloud project ID.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/databases/{database_id}"
    )
    table = bigquery_biglake_v1.Table(
        type_=bigquery_biglake_v1.Table.Type.HIVE,
        hive_options=bigquery_biglake_v1.HiveTableOptions(
            table_type="MANAGED_TABLE",
        ),
    )

    request = bigquery_biglake_v1.CreateTableRequest(
        parent=parent,
        table_id=table_id,
        table=table,
    )

    try:
        response = client.create_table(request=request)
        print(f"Created table: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create table: {exc.message}")
# [END biglake_v1_metastoreservice_table_create]
