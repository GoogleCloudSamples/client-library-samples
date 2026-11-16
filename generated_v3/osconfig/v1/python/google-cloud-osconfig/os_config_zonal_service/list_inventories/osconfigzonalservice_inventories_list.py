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

# [START osconfig_v1_osconfigzonalservice_inventories_list]
from google.api_core import exceptions
from google.cloud import osconfig_v1


def list_inventories(project_id: str, location_id: str) -> None:
    """Lists VM instance inventory data in a specified Google Cloud zone.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud zone (location) to list VM inventories for (for example, 'us-central1-a').
    """
    client = osconfig_v1.OsConfigZonalServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/instances/-"

    request = osconfig_v1.ListInventoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_inventories(request=request)
        found = False
        for inventory in response:
            found = True
            print(f"Inventory name: {inventory.name}")
            print(f"Operating system: {inventory.os_info.long_name}")

        if not found:
            print(f"No inventories found in location: {location_id}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list inventories: {error.message}")
# [END osconfig_v1_osconfigzonalservice_inventories_list]
