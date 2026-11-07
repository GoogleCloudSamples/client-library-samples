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

# [START backupdr_v1_backupdr_managementserver_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1

client = backupdr_v1.BackupDRClient()


def get_management_server(
    project_id: str, location_id: str, management_server_id: str
) -> None:
    """Retrieve details of a ManagementServer resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        management_server_id: The ID of the ManagementServer to retrieve (for example, 'example-management-server')
    """
    name = f"projects/{project_id}/locations/{location_id}/managementServers/{management_server_id}"

    request = backupdr_v1.GetManagementServerRequest(
        name=name,
    )

    try:
        response = client.get_management_server(request=request)
        print(f"Management Server Name: {response.name}")
        print(f"Management Server State: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error retrieving management server: {e}")
# [END backupdr_v1_backupdr_managementserver_get]
