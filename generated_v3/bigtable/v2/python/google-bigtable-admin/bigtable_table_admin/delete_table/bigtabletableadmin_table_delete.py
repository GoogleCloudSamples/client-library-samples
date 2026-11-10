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

# [START bigtable_v2_bigtabletableadmin_table_delete]
from google.api_core import exceptions
from google.cloud import bigtable_admin_v2


def delete_table(project_id: str, instance_id: str, table_id: str) -> None:
    """Deletes a Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The Cloud Bigtable instance ID (for example, 'example-instance-id').
        table_id: The Cloud Bigtable table ID (for example, 'example-table-id').
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()
    name = f"projects/{project_id}/instances/{instance_id}/tables/{table_id}"

    try:
        client.delete_table(name=name)
        print(f"Deleted table: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete table: {error}")
# [END bigtable_v2_bigtabletableadmin_table_delete]
