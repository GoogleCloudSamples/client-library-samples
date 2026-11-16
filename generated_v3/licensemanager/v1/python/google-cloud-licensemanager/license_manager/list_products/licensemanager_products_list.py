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

# [START licensemanager_v1_licensemanager_products_list]
import google.api_core.exceptions
from google.cloud import licensemanager_v1

client = licensemanager_v1.LicenseManagerClient()


def list_products(project_id: str, location_id: str) -> None:
    """List products available in a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location or region identifier (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    request = licensemanager_v1.ListProductsRequest(parent=parent)

    try:
        response = client.list_products(request=request)
        for product in response:
            print(f"Product: {product.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list products: {error}")
# [END licensemanager_v1_licensemanager_products_list]
