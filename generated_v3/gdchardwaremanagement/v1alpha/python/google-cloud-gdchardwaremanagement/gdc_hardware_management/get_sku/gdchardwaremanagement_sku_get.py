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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def get_sku(project_id: str, location_id: str, sku_id: str) -> None:
    """Retrieve details of a specific SKU in Google Distributed Cloud hardware management.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        sku_id: ID of the SKU (for example, 'example-sku-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/skus/{sku_id}"

    request = gdchardwaremanagement_v1alpha.GetSkuRequest(
        name=name,
    )

    try:
        response = client.get_sku(request=request)
        print(f"SKU Name: {response.name}")
        print(f"Display Name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve SKU: {e}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
