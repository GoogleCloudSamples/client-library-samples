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

# [START backupdr_v1beta_backupdr_backupvault_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta

client = backupdr_v1beta.BackupDRClient()


def get_backup_vault(project_id: str, location_id: str, backup_vault_id: str) -> None:
    """Use the get_backup_vault method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the BackupVault is located (for example, 'us-central1').
        backup_vault_id: The ID of the BackupVault to retrieve (between 3 and 63 characters).
    """
    name = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"

    request = backupdr_v1beta.GetBackupVaultRequest(name=name)

    try:
        response = client.get_backup_vault(request=request)
        print(f"Retrieved backup vault: {response.name}")
        print(f"Vault state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve backup vault: {error.message}")
# [END backupdr_v1beta_backupdr_backupvault_get]
