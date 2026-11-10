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

# [START backupdr_v1beta_backupdr_managementserver_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta

client = backupdr_v1beta.BackupDRClient()


def get_management_server(
    project_id: str, location_id: str, management_server_id: str
) -> None:
    """Use the get_management_server method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        management_server_id: The ID of the Management Server to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/managementServers/{management_server_id}"

    try:
        response = client.get_management_server(name=name)
        print(f"Retrieved Management Server: {response.name}")
        print(f"Management Server State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve Management Server: {error}")
# [END backupdr_v1beta_backupdr_managementserver_get]
