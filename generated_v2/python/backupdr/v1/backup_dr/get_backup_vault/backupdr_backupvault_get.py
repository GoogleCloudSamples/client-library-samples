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

# [START backupdr_v1_backupdr_backupvault_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1

client = backupdr_v1.BackupDRClient()


def get_backup_vault(project_id: str, location_id: str, backup_vault_id: str) -> None:
    """Retrieve details for a Backup and DR Service backup vault.

    Args:
        project_id: The Google Cloud project ID where the BackupVault is located.
        location_id: The Google Cloud region where the BackupVault is located (for example, 'us-central1').
        backup_vault_id: The ID of the BackupVault to retrieve. Must be 3 to 63 characters long.
    """
    name = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"

    request = backupdr_v1.GetBackupVaultRequest(
        name=name,
    )

    try:
        response = client.get_backup_vault(request=request)
        print(f"Name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Description: {response.description}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END backupdr_v1_backupdr_backupvault_get]
