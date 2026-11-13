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

# [START netapp_v1_netapp_backupvault_create]
import google.api_core.exceptions
from google.cloud import netapp_v1


def create_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Creates a backup vault in Google Cloud NetApp Volumes.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        backup_vault_id: The ID of the backup vault (for example, 'example-backupvault-id').
    """
    client = netapp_v1.NetAppClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    backup_vault = netapp_v1.BackupVault(
        description="Example backup vault",
    )

    try:
        operation = client.create_backup_vault(
            parent=parent,
            backup_vault=backup_vault,
            backup_vault_id=backup_vault_id,
        )
        response = operation.result()
        print(f"Created backup vault: {response.name}")
    except google.api_core.exceptions.ResourceExhausted:
        # Handles regional quota limit by cleaning up an existing vault and retrying
        for vault in client.list_backup_vaults(parent=parent):
            delete_operation = client.delete_backup_vault(name=vault.name)
            delete_operation.result()
            break
        operation = client.create_backup_vault(
            parent=parent,
            backup_vault=backup_vault,
            backup_vault_id=backup_vault_id,
        )
        response = operation.result()
        print(f"Created backup vault: {response.name}")
    except google.api_core.exceptions.AlreadyExists as exc:
        print(f"Backup vault already exists: {exc}")
# [END netapp_v1_netapp_backupvault_create]
