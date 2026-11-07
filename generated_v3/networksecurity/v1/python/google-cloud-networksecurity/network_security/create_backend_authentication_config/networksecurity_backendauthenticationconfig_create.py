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

# [START networksecurity_v1_networksecurity_backendauthenticationconfig_create]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_backend_authentication_config(
    project_id: str,
    location_id: str,
    backend_authentication_config_id: str,
) -> None:
    """Creates a BackendAuthenticationConfig resource in Google Cloud Network Security.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        backend_authentication_config_id: ID of the BackendAuthenticationConfig (for example, 'example-backendauthenticationconfig-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    backend_authentication_config = (
        network_security_v1.BackendAuthenticationConfig(
            description="Backend authentication configuration for secure service communication",
            well_known_roots=network_security_v1.BackendAuthenticationConfig.WellKnownRoots.PUBLIC_ROOTS,
        )
    )

    try:
        operation = client.create_backend_authentication_config(
            parent=parent,
            backend_authentication_config_id=backend_authentication_config_id,
            backend_authentication_config=backend_authentication_config,
        )
        response = operation.result()
        print(f"Created backend authentication config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END networksecurity_v1_networksecurity_backendauthenticationconfig_create]
