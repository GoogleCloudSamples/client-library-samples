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

# [START iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
import os

from google.api_core import exceptions
import google.auth
from google.cloud import iap_v1


def reset_identity_aware_proxy_client_secret(brand_id: str, client_id: str) -> None:
    """Resets the client secret of an Identity-Aware Proxy OAuth client.

    Args:
        brand_id: ID of the brand (for example, 'example-brand-id').
        client_id: ID of the client (for example, 'example-client-id').
    """
    _, project_id = google.auth.default()
    project_id = project_id or os.getenv("GOOGLE_CLOUD_PROJECT", "example-project-id")

    client = iap_v1.IdentityAwareProxyOAuthServiceClient()

    name = f"projects/{project_id}/brands/{brand_id}/identityAwareProxyClients/{client_id}"

    request = iap_v1.ResetIdentityAwareProxyClientSecretRequest(name=name)

    try:
        response = client.reset_identity_aware_proxy_client_secret(request=request)
        print(f"Reset client secret for client: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to reset client secret: {error}")
# [END iap_v1_identityawareproxyoauthservice_reset_identity_aware_proxy_client_secret]
