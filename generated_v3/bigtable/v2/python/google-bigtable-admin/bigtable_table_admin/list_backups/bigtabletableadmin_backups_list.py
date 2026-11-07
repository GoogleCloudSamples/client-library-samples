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

# [START bigtable_v2_bigtabletableadmin_backups_list]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def list_backups(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Lists Bigtable backups in a cluster or across all clusters in an instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the Bigtable instance (for example, 'example-instance-id').
        cluster_id: The ID of the Bigtable cluster, or '-' to list backups across all clusters.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()
    parent = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        response = client.list_backups(parent=parent)
        for backup in response:
            print(f"Backup name: {backup.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END bigtable_v2_bigtabletableadmin_backups_list]
