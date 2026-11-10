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

# [START bigtable_v2_bigtabletableadmin_table_update]
from google.api_core import exceptions
from google.cloud import bigtable_admin_v2
from google.protobuf import field_mask_pb2

client = bigtable_admin_v2.BigtableTableAdminClient()


def update_table(project_id: str, instance_id: str, table_id: str) -> None:
    """Updates a Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Bigtable instance containing the table.
        table_id: The ID of the table to update.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["deletion_protection"])
    table = bigtable_admin_v2.Table(
        name=f"projects/{project_id}/instances/{instance_id}/tables/{table_id}",
        deletion_protection=True,
    )

    try:
        operation = client.update_table(table=table, update_mask=update_mask)
        response = operation.result()
        print(f"Updated table: {response.name}")
        print(f"Deletion protection enabled: {response.deletion_protection}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update table: {error}")
# [END bigtable_v2_bigtabletableadmin_table_update]
