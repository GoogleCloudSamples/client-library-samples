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

# [START osconfig_v1alpha_osconfigzonalservice_inventories_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha


def list_inventories(project_id: str) -> None:
    """List operating system inventory data for instances.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    client = osconfig_v1alpha.OsConfigZonalServiceClient()

    parent = f"projects/{project_id}/locations/us-central1-a/instances/-"

    request = osconfig_v1alpha.ListInventoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_inventories(request=request)
        count = 0
        for inventory in response:
            print(f"Inventory resource name: {inventory.name}")
            count += 1
        if count == 0:
            print("No inventories found.")
        else:
            print(f"Total inventories listed: {count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END osconfig_v1alpha_osconfigzonalservice_inventories_list]
