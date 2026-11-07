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

# [START licensemanager_v1_licensemanager_product_get]
import google.api_core.exceptions
from google.cloud import licensemanager_v1

client = licensemanager_v1.LicenseManagerClient()


def get_product(project_id: str, location_id: str, product_id: str) -> None:
    """Retrieves information about a specified product.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example, 'us-central1').
        product_id: The server-defined product ID, obtained by listing products.
    """
    name = f"projects/{project_id}/locations/{location_id}/products/{product_id}"

    request = licensemanager_v1.GetProductRequest(
        name=name,
    )

    try:
        response = client.get_product(request=request)
        print(f"Retrieved product: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve product: {e.message}")
# [END licensemanager_v1_licensemanager_product_get]
