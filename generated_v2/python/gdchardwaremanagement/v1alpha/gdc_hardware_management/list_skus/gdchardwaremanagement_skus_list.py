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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_skus_list]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def list_skus(project_id: str, location_id: str) -> None:
    """Lists hardware SKUs in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = gdchardwaremanagement_v1alpha.ListSkusRequest(
        parent=parent,
    )

    try:
        response = client.list_skus(request=request)
        for sku in response:
            print(f"SKU Name: {sku.name}")
            print(f"Display Name: {sku.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list SKUs: {error}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_skus_list]
