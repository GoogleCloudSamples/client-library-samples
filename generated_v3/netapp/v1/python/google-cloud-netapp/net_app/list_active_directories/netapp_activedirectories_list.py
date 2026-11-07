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

# [START netapp_v1_netapp_activedirectories_list]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def list_active_directories(project_id: str, location_id: str) -> None:
    """List Active Directory configurations in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) to list Active Directories in, such as `us-central1`.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = netapp_v1.ListActiveDirectoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_active_directories(request=request)
        for active_directory in response:
            print(f"Name: {active_directory.name}")
            print(f"Domain: {active_directory.domain}")
            print(f"NetBIOS name: {active_directory.net_bios_prefix}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list Active Directories: {e}")
# [END netapp_v1_netapp_activedirectories_list]
