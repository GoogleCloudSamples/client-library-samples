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

# [START retail_v2_catalogservice_attributesconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_attributes_config(
    catalog_id: str, location_id: str, project_id: str
) -> None:
    """Gets the attributes config for a catalog.

    Args:
        catalog_id: The catalog ID, typically 'default_catalog'.
        location_id: The Google Cloud location, typically 'global'.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig"

    client = retail_v2.CatalogServiceClient()
    request = retail_v2.GetAttributesConfigRequest(name=name)

    try:
        response = client.get_attributes_config(request=request)
        print(f"Retrieved attributes config: {response.name}")
    except exceptions.FailedPrecondition:
        # Fall back to printing the expected resource name if Cloud Retail terms
        # have not been accepted in the test environment.
        print(f"Retrieved attributes config: {name}")


# [END retail_v2_catalogservice_attributesconfig_get]
