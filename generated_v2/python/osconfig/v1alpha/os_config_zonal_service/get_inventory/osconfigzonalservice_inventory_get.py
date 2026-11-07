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

# [START osconfig_v1alpha_osconfigzonalservice_inventory_get]
import google.api_core.exceptions
from google.cloud import osconfig_v1


def get_inventory(project_id: str, location_id: str, instance_id: str) -> None:
    """Retrieves OS inventory details for a Compute Engine VM instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud zone or location for the VM instance (for example, 'us-central1-a').
        instance_id: The Compute Engine VM instance name or numeric ID.
    """
    client = osconfig_v1.OsConfigZonalServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}/inventory"

    request = osconfig_v1.GetInventoryRequest(
        name=name,
        view=osconfig_v1.InventoryView.FULL,
    )

    try:
        response = client.get_inventory(request=request)
        print(f"Inventory name: {response.name}")
        print(f"Operating system: {response.os_info.long_name}")
        print(f"Kernel version: {response.os_info.kernel_version}")
    except google.api_core.exceptions.NotFound as e:
        print(f"Inventory not found: {e.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve inventory: {e.message}")
# [END osconfig_v1alpha_osconfigzonalservice_inventory_get]
