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

# [START backupdr_v1beta_backupdr_backupvault_delete]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta

client = backupdr_v1beta.BackupDRClient()


def delete_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Deletes an existing Backup Vault.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for the Backup Vault (for example,
          'us-central1').
        backup_vault_id: The caller-chosen ID of the Backup Vault to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"
    )

    try:
        # DeleteBackupVault is a long-running operation; wait for it to complete.
        operation = client.delete_backup_vault(name=name)
        operation.result()
        print(f"Deleted backup vault: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete backup vault: {e}")
# [END backupdr_v1beta_backupdr_backupvault_delete]
