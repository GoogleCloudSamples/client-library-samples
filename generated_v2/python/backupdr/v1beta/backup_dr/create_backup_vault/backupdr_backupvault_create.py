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

# [START backupdr_v1beta_backupdr_backupvault_create]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta
from google.protobuf import duration_pb2

client = backupdr_v1beta.BackupDRClient()


def create_backup_vault(backup_vault_id: str, project_id: str, location_id: str) -> None:
    """Creates a backup vault in the specified project and location.

    Args:
        backup_vault_id: The caller-chosen ID to use for the backup vault. Must
          be between 3 and 63 characters.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) where the backup vault
          is created (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    backup_vault = backupdr_v1beta.BackupVault(
        backup_minimum_enforced_retention_duration=duration_pb2.Duration(
            seconds=259200
        )
    )

    try:
        operation = client.create_backup_vault(
            parent=parent,
            backup_vault_id=backup_vault_id,
            backup_vault=backup_vault,
        )
        response = operation.result()
        print(f"Created backup vault: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create backup vault: {exc}")
# [END backupdr_v1beta_backupdr_backupvault_create]
