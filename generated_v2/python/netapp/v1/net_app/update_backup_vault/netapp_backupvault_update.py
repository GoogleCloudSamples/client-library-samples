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

# [START netapp_v1_netapp_backupvault_update]
import google.api_core.exceptions
from google.cloud import netapp_v1
from google.protobuf import field_mask_pb2

client = netapp_v1.NetAppClient()


def update_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Updates an existing NetApp backup vault.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the backup vault is located.
        backup_vault_id: The ID of the existing backup vault to update.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    backup_vault = netapp_v1.BackupVault(
        name=f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}",
        description="Updated backup vault description",
    )

    request = netapp_v1.UpdateBackupVaultRequest(
        update_mask=update_mask,
        backup_vault=backup_vault,
    )

    try:
        operation = client.update_backup_vault(request=request)
        response = operation.result()
        print(f"Updated backup vault: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update backup vault: {error}")


# [END netapp_v1_netapp_backupvault_update]
