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

# [START netapp_v1_netapp_backups_list]
from google.api_core import exceptions
from google.cloud import netapp_v1


def list_backups(backup_vault_id: str, project_id: str, location_id: str) -> None:
    """Lists NetApp backups in a specified backup vault or location.

    Args:
        backup_vault_id: The ID of the NetApp backup vault, or '-' to list backups across all backup vaults.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) of the backup vault, or '-' to list across all locations.
    """
    client = netapp_v1.NetAppClient()

    parent = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"
    request = netapp_v1.ListBackupsRequest(parent=parent)

    try:
        response = client.list_backups(request=request)
        found_backups = False
        for backup in response:
            found_backups = True
            print(f"Backup Name: {backup.name}")
            print(f"State: {backup.state.name}")

        if not found_backups:
            print(f"No backups found in {parent}.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list backups: {error}")
# [END netapp_v1_netapp_backups_list]
