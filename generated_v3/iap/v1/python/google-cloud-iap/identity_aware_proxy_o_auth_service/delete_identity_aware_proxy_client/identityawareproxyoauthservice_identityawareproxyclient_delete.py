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

# [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyOAuthServiceClient()


def delete_identity_aware_proxy_client(
    brand_id: str, project_id: str, client_id: str
) -> None:
    """Delete an Identity-Aware Proxy OAuth client.

    Args:
        brand_id: The identifier of the OAuth brand, typically the project number.
        project_id: The Google Cloud project ID.
        client_id: The server-generated client ID of the Identity-Aware Proxy OAuth client to delete.
    """
    name = (
        f"projects/{project_id}/brands/{brand_id}/"
        f"identityAwareProxyClients/{client_id}"
    )

    request = iap_v1.DeleteIdentityAwareProxyClientRequest(name=name)

    try:
        client.delete_identity_aware_proxy_client(request=request)
        print(f"Deleted Identity-Aware Proxy client: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete client {name}: {error}")
# [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
