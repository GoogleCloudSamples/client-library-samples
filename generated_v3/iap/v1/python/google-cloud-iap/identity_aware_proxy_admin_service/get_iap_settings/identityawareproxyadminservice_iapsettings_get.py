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

# [START iap_v1_identityawareproxyadminservice_iapsettings_get]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def get_iap_settings(name: str) -> None:
    """Retrieves Identity-Aware Proxy (IAP) settings for a resource.

    Args:
        name: The resource name of the IAP-protected resource (for example,
            'projects/example-project-id' or 'projects/example-project-id/iap_web').
    """
    request = iap_v1.GetIapSettingsRequest(
        name=name,
    )

    try:
        response = client.get_iap_settings(request=request)
        print(f"Retrieved settings for: {response.name}")
        print(f"Access settings: {response.access_settings}")
        print(f"Application settings: {response.application_settings}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving IAP settings: {error.message}")
# [END iap_v1_identityawareproxyadminservice_iapsettings_get]
