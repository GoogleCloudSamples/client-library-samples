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

# [START backupdr_v1_backupdr_backupvaults_list]
import google.api_core.exceptions
from google.cloud import backupdr_v1

try:
    from google.cloud import resourcemanager_v3
except ImportError:
    resourcemanager_v3 = None


def list_backup_vaults(project_id: str, location_id: str) -> None:
    """Lists Backup Vaults in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = backupdr_v1.BackupDRClient()

    # Normalize identifiers in case full resource paths are provided
    project_id = project_id.split("/")[-1]
    location_id = location_id.split("/")[-1]

    # Backup and DR Service requires numeric project numbers in resource paths
    if not project_id.isdigit() and resourcemanager_v3 is not None:
        try:
            crm_client = resourcemanager_v3.ProjectsClient()
            project = crm_client.get_project(name=f"projects/{project_id}")
            project_id = project.name.split("/")[1]
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    parent = f"projects/{project_id}/locations/{location_id}"

    request = backupdr_v1.ListBackupVaultsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_backup_vaults(request=request)
        for backup_vault in page_result:
            print(f"Backup Vault: {backup_vault.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list backup vaults: {error}")


# [END backupdr_v1_backupdr_backupvaults_list]
