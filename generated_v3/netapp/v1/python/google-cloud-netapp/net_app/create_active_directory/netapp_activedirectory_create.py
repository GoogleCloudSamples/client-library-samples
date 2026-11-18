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

# [START netapp_v1_netapp_activedirectory_create]
import google.api_core.exceptions
from google.cloud import netapp_v1


def create_active_directory(
    active_directory_id: str, project_id: str, location_id: str
) -> None:
    """Creates an Active Directory configuration in NetApp Volumes.

    Args:
        active_directory_id: Caller-chosen ID of the Active Directory
            configuration to create. Must be unique within the parent resource
            (for example, 'example-ad').
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location for the Active Directory resource.
    """
    client = netapp_v1.NetAppClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    active_directory = netapp_v1.ActiveDirectory(
        domain="example.com",
        dns="10.0.0.1",
        net_bios_prefix="example-ad",
        username="example-admin",
        password="example-password",
    )

    try:
        operation = client.create_active_directory(
            parent=parent,
            active_directory=active_directory,
            active_directory_id=active_directory_id,
        )
        response = operation.result()
        print(f"Created Active Directory: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Active Directory creation failed: {error}")
# [END netapp_v1_netapp_activedirectory_create]
