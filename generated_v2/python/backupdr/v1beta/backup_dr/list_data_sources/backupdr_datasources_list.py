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

# [START backupdr_v1beta_backupdr_datasources_list]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta


def list_data_sources(project_id: str, location_id: str) -> None:
    """Lists data sources across backup vaults in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = backupdr_v1beta.BackupDRClient()

    # Use the wildcard '-' to query data sources across all backup vaults in the location
    backup_vault_id = "-"
    parent = (
        f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"
    )

    request = backupdr_v1beta.ListDataSourcesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_data_sources(request=request)
        count = 0
        for data_source in page_result:
            print(f"Data source name: {data_source.name}")
            print(f"Data source state: {data_source.state.name}")
            count += 1
        if count == 0:
            print("No data sources found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list data sources: {e}")
# [END backupdr_v1beta_backupdr_datasources_list]
