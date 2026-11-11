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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroups_list]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha


def list_hardware_groups(project_id: str, location_id: str, order_id: str) -> None:
    """Lists hardware groups in an order.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud location ID (for example, 'us-central1').
        order_id: Target Order ID (for example, 'example-order-id').
    """
    client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()

    parent = f"projects/{project_id}/locations/{location_id}/orders/{order_id}"

    request = gdchardwaremanagement_v1alpha.ListHardwareGroupsRequest(
        parent=parent,
    )

    try:
        response = client.list_hardware_groups(request=request)
        count = 0
        for hardware_group in response:
            print(f"Hardware group: {hardware_group.name}")
            print(f"Hardware count: {hardware_group.hardware_count}")
            count += 1

        if count == 0:
            print("No hardware groups found.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroups_list]
