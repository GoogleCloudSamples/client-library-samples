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

# [START netapp_v1_netapp_activedirectory_delete]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def delete_active_directory(
    project_id: str, location_id: str, active_directory_id: str
) -> None:
    """Deletes an Active Directory resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) of the Active Directory.
        active_directory_id: The identifier of the Active Directory to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/activeDirectories/{active_directory_id}"

    request = netapp_v1.DeleteActiveDirectoryRequest(name=name)

    try:
        operation = client.delete_active_directory(request=request)
        operation.result()
        print(f"Deleted Active Directory: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete Active Directory: {error}")
# [END netapp_v1_netapp_activedirectory_delete]
