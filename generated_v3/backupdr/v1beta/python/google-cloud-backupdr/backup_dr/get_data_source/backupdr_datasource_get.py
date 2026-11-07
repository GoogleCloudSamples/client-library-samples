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

# [START backupdr_v1beta_backupdr_datasource_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta

client = backupdr_v1beta.BackupDRClient()


def get_data_source(
    project_id: str, location_id: str, backup_vault_id: str, data_source_id: str
) -> None:
    """Retrieves a data source from a Backup and DR backup vault.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        backup_vault_id: The ID of the backup vault (for example, 'example-backup-vault').
        data_source_id: The ID of the data source (for example, 'example-data-source').
    """
    name = f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}/dataSources/{data_source_id}"

    request = backupdr_v1beta.GetDataSourceRequest(
        name=name,
    )

    try:
        response = client.get_data_source(request=request)
        print(f"Data source name: {response.name}")
        print(f"Data source state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve data source: {error}")


# [END backupdr_v1beta_backupdr_datasource_get]
