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

# [START iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyOAuthServiceClient()


def list_identity_aware_proxy_clients(brand_id: str, project_id: str) -> None:
    """List Identity Aware Proxy (IAP) OAuth clients for a specified brand.

    Args:
        brand_id: The OAuth brand ID under which the IAP OAuth clients are created.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/brands/{brand_id}"

    request = iap_v1.ListIdentityAwareProxyClientsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_identity_aware_proxy_clients(request=request)
        for iap_client in page_result:
            print(f"Client Name: {iap_client.name}")
            print(f"Display Name: {iap_client.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
