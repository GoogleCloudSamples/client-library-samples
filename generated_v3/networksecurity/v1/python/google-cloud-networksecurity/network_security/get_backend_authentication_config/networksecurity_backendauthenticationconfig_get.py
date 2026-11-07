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

# [START networksecurity_v1_networksecurity_backendauthenticationconfig_get]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_backend_authentication_config(
    project_id: str, location_id: str, backend_authentication_config_id: str
) -> None:
    """Retrieves a BackendAuthenticationConfig resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location where the BackendAuthenticationConfig is located (for example, 'global' or 'us-central1').
        backend_authentication_config_id: The identifier of the BackendAuthenticationConfig to retrieve.
    """
    client = network_security_v1.NetworkSecurityClient()

    name = f"projects/{project_id}/locations/{location_id}/backendAuthenticationConfigs/{backend_authentication_config_id}"

    request = network_security_v1.GetBackendAuthenticationConfigRequest(
        name=name,
    )

    try:
        response = client.get_backend_authentication_config(request=request)
        print(f"Retrieved BackendAuthenticationConfig: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")


# [END networksecurity_v1_networksecurity_backendauthenticationconfig_get]
