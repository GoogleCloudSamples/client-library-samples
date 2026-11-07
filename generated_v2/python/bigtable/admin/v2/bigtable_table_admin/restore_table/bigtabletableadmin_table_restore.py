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

# [START bigtable_v2_bigtabletableadmin_restore_table]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def restore_table(
    project_id: str,
    instance_id: str,
    table_id: str,
    cluster_id: str,
    backup_id: str,
) -> None:
    """Restores a Cloud Bigtable table from an existing backup.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the instance (for example, 'example-instance-id').
        table_id: The ID of the table to create and restore to (for example, 'restored-table').
        cluster_id: The ID of the cluster containing the source backup (for example, 'example-cluster').
        backup_id: The ID of the backup from which to restore the table (for example, 'example-backup').
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()

    parent = f"projects/{project_id}/instances/{instance_id}"
    backup = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}/backups/{backup_id}"

    request = bigtable_admin_v2.RestoreTableRequest(
        parent=parent,
        table_id=table_id,
        backup=backup,
    )

    try:
        operation = client.restore_table(request=request)
        response = operation.result()
        print(f"Restored table: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END bigtable_v2_bigtabletableadmin_restore_table]
