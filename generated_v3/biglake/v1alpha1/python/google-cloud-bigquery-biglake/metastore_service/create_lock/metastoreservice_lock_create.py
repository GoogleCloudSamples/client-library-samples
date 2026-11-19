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

# [START biglake_v1alpha1_metastoreservice_lock_create]
import google.api_core.exceptions
from google.cloud import bigquery_biglake_v1alpha1


def create_lock(
    location_id: str,
    catalog_id: str,
    database_id: str,
    table_id: str,
    project_id: str,
) -> None:
    """Creates an exclusive lock on a table within a BigLake database.

    Args:
        location_id: The Google Cloud region where the BigLake metastore database is located.
        catalog_id: The ID of the BigLake catalog.
        database_id: The ID of the BigLake database.
        table_id: The ID of the table in the same database on which the lock is created.
        project_id: The Google Cloud project ID.
    """
    client = bigquery_biglake_v1alpha1.MetastoreServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/databases/{database_id}"
    )
    lock = bigquery_biglake_v1alpha1.Lock(
        type_=bigquery_biglake_v1alpha1.Lock.Type.EXCLUSIVE,
        table_id=table_id,
    )

    try:
        response = client.create_lock(parent=parent, lock=lock)
        print(f"Created lock: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create lock: {error}")


# [END biglake_v1alpha1_metastoreservice_lock_create]
