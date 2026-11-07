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

# [START biglake_v1_metastoreservice_table_delete]
import google.api_core.exceptions
from google.cloud import bigquery_biglake_v1


def delete_table(
    location_id: str,
    catalog_id: str,
    database_id: str,
    table_id: str,
    project_id: str,
) -> None:
    """Deletes a table from a BigLake metastore database.

    Args:
        location_id: The Google Cloud region where the BigLake metastore is located (for example, 'us-central1').
        catalog_id: The ID of the BigLake catalog containing the database and table.
        database_id: The ID of the BigLake database containing the table.
        table_id: The ID of the BigLake table to delete.
        project_id: The Google Cloud project ID.
    """
    client = bigquery_biglake_v1.MetastoreServiceClient()
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/databases/{database_id}/tables/{table_id}"
    )

    try:
        response = client.delete_table(name=name)
        print(f"Deleted table: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete table: {error}")
# [END biglake_v1_metastoreservice_table_delete]
