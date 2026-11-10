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

# [START backupdr_v1beta_backupdr_backupvault_update]
import time

from google.api_core import exceptions
from google.cloud import backupdr_v1beta
from google.protobuf import field_mask_pb2


def update_backup_vault(
    project_id: str, location_id: str, backup_vault_id: str
) -> None:
    """Updates the description of an existing backup vault.

    Args:
        project_id: The ID of the Google Cloud project hosting the backup vault.
        location_id: The Google Cloud region where the backup vault is located
          (for example, 'us-central1').
        backup_vault_id: The ID of the backup vault to update.
    """
    client = backupdr_v1beta.BackupDRClient()
    vault_name = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"

    backup_vault = backupdr_v1beta.BackupVault(
        name=vault_name,
        description="Updated description for the backup vault",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    # Vault creation is asynchronous; retry if the resource is still being created.
    max_attempts = 30
    delay_seconds = 5
    for attempt in range(max_attempts):
        try:
            operation = client.update_backup_vault(
                backup_vault=backup_vault,
                update_mask=update_mask,
            )
            response = operation.result()
            print(f"Updated backup vault: {response.name}")
            print(f"New description: {response.description}")
            break
        except (
            exceptions.Conflict,
            exceptions.Aborted,
            exceptions.AlreadyExists,
            exceptions.FailedPrecondition,
        ) as error:
            if "being created" in str(error) and attempt < max_attempts - 1:
                time.sleep(delay_seconds)
                continue
            print(f"Failed to update backup vault: {error}")
            break
        except exceptions.GoogleAPICallError as error:
            print(f"Failed to update backup vault: {error}")
            break
# [END backupdr_v1beta_backupdr_backupvault_update]
