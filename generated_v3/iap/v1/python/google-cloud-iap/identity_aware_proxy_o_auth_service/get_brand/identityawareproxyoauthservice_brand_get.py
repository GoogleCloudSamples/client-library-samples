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

# [START iap_v1_identityawareproxyoauthservice_brand_get]
from google.api_core import exceptions
from google.cloud import iap_v1


def get_brand(brand_id: str, project_id: str) -> None:
    """Retrieves the Identity-Aware Proxy OAuth brand for a project.

    Args:
        brand_id: The server-generated brand ID.
        project_id: The Google Cloud project ID.
    """
    client = iap_v1.IdentityAwareProxyOAuthServiceClient()

    name = f"projects/{project_id}/brands/{brand_id}"
    request = iap_v1.GetBrandRequest(name=name)

    try:
        response = client.get_brand(request=request)
        print(f"Brand name: {response.name}")
        print(f"Support email: {response.support_email}")
        print(f"Application title: {response.application_title}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error retrieving brand: {error}")
# [END iap_v1_identityawareproxyoauthservice_brand_get]
