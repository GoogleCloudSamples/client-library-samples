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

# [START backupdr_v1_backupdr_managementservers_list]
import google.api_core.exceptions
from google.cloud import backupdr_v1

client = backupdr_v1.BackupDRClient()


def list_management_servers(project_id: str, location_id: str) -> None:
    """Lists management servers in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = backupdr_v1.ListManagementServersRequest(
        parent=parent,
    )

    try:
        response = client.list_management_servers(request=request)
        for management_server in response:
            print(f"Name: {management_server.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list management servers: {error}")
# [END backupdr_v1_backupdr_managementservers_list]
