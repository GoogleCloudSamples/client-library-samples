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

# [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
import google.api_core.exceptions
from google.cloud import iap_v1


def get_identity_aware_proxy_client(
    brand_id: str, project_id: str, client_id: str
) -> None:
    """Retrieves an Identity-Aware Proxy (IAP) OAuth client.

    Args:
        brand_id: The OAuth brand ID.
        project_id: The Google Cloud project ID.
        client_id: The client identifier of the IAP OAuth client.
    """
    client = iap_v1.IdentityAwareProxyOAuthServiceClient()

    name = f"projects/{project_id}/brands/{brand_id}/identityAwareProxyClients/{client_id}"
    request = iap_v1.GetIdentityAwareProxyClientRequest(name=name)

    try:
        response = client.get_identity_aware_proxy_client(request=request)
        print(f"Client name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve IAP OAuth client: {error}")
# [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_get]
