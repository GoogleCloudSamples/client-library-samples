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

# [START netapp_v1_netapp_backupvault_get]
import google.api_core.exceptions
from google.cloud import netapp_v1


def get_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Retrieves details of a NetApp backup vault.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region (for example, 'us-central1').
        backup_vault_id: Identifier of the backup vault (for example, 'example-backup-vault-id').
    """
    client = netapp_v1.NetAppClient()

    # Normalize identifiers to ensure resource name paths do not duplicate prefixes
    project_id = project_id.split("/")[-1]
    location_id = location_id.split("/")[-1]
    backup_vault_id = backup_vault_id.split("/")[-1]

    name = client.backup_vault_path(project_id, location_id, backup_vault_id)

    request = netapp_v1.GetBackupVaultRequest(name=name)

    try:
        response = client.get_backup_vault(request=request)
        print(f"Backup vault name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve backup vault: {error}")


# [END netapp_v1_netapp_backupvault_get]
