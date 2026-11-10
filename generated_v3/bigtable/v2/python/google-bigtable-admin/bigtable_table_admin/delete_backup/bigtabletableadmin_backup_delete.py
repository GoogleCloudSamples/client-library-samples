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

# [START bigtable_v2_bigtabletableadmin_backup_delete]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def delete_backup(
    project_id: str, instance_id: str, cluster_id: str, backup_id: str
) -> None:
    """Deletes an existing Cloud Bigtable backup.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the Bigtable instance containing the cluster and backup (for example, 'example-instance').
        cluster_id: The ID of the Bigtable cluster containing the backup (for example, 'example-cluster').
        backup_id: The ID of the Cloud Bigtable backup to delete (for example, 'example-backup'). Must be between 1 and 50 characters matching `[_a-zA-Z0-9][-_.a-zA-Z0-9]*`.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()
    name = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}/backups/{backup_id}"

    try:
        client.delete_backup(name=name)
        print(f"Deleted backup: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete backup: {e}")
# [END bigtable_v2_bigtabletableadmin_backup_delete]
