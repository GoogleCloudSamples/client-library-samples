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

# [START networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_update]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1
from google.protobuf import field_mask_pb2


def update_backend_authentication_config(
    project_id: str, location_id: str, backend_authentication_config_id: str
) -> None:
    """Updates the description of an existing backend authentication configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the backend authentication config (for
          example, "global").
        backend_authentication_config_id: The ID of the
          BackendAuthenticationConfig to update.
    """
    client = network_security_v1alpha1.NetworkSecurityClient()

    backend_authentication_config = (
        network_security_v1alpha1.BackendAuthenticationConfig(
            name=(
                f"projects/{project_id}/locations/{location_id}/"
                f"backendAuthenticationConfigs/{backend_authentication_config_id}"
            ),
            description="Updated backend authentication configuration",
        )
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = network_security_v1alpha1.UpdateBackendAuthenticationConfigRequest(
        backend_authentication_config=backend_authentication_config,
        update_mask=update_mask,
    )

    try:
        operation = client.update_backend_authentication_config(request=request)
        try:
            response = operation.result()
        except TypeError:
            # Handle the API service returning a v1 response proto for a v1alpha1 request.
            response = (
                network_security_v1alpha1.BackendAuthenticationConfig.deserialize(
                    operation.operation.response.value
                )
            )
        print(f"Updated backend authentication config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update backend authentication config: {e}")


# [END networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_update]
