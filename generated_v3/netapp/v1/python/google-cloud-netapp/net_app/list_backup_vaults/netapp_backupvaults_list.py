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

# [START netapp_v1_netapp_backupvaults_list]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def list_backup_vaults(project_id: str, location_id: str) -> None:
    """Lists NetApp backup vaults in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = netapp_v1.ListBackupVaultsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_backup_vaults(request=request)
        for backup_vault in page_result:
            print(f"Backup Vault name: {backup_vault.name}")
            print(f"State: {backup_vault.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API Error occurred: {e.message}")


# [END netapp_v1_netapp_backupvaults_list]
