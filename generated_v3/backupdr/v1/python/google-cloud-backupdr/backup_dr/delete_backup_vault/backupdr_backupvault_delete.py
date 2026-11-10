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

# [START backupdr_v1_backupdr_backupvault_delete]
import google.api_core.exceptions
from google.cloud import backupdr_v1

client = backupdr_v1.BackupDRClient()


def delete_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Deletes a backup vault in Google Cloud Backup and DR Service.

    Args:
        project_id: The Google Cloud project ID containing the backup vault.
        location_id: The Google Cloud region where the backup vault is located.
        backup_vault_id: The ID of the backup vault to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"

    request = backupdr_v1.DeleteBackupVaultRequest(
        name=name,
    )

    try:
        operation = client.delete_backup_vault(request=request)
        operation.result()
        print(f"Deleted backup vault: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete backup vault: {error}")
# [END backupdr_v1_backupdr_backupvault_delete]
