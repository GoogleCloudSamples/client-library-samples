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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def list_orders(project_id: str, location_id: str) -> None:
    """Lists orders in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = gdchardwaremanagement_v1alpha.ListOrdersRequest(
        parent=parent,
    )

    try:
        response = client.list_orders(request=request)
        for order in response:
            print(f"Order name: {order.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list orders: {error}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
