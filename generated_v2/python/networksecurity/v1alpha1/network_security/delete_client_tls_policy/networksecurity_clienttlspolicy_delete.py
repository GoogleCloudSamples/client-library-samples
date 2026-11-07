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

# [START networksecurity_v1alpha1_networksecurity_clienttlspolicy_delete]
import google.api_core.exceptions
from google.cloud import network_security_v1


def delete_client_tls_policy(
    project_id: str, location_id: str, client_tls_policy_id: str
) -> None:
    """Deletes a ClientTlsPolicy resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        client_tls_policy_id: The ID of the ClientTlsPolicy (for example,
          'example-clienttlspolicy-id').
    """
    client = network_security_v1.NetworkSecurityClient()
    name = client.client_tls_policy_path(
        project_id, location_id, client_tls_policy_id
    )

    try:
        operation = client.delete_client_tls_policy(name=name)
        operation.result()
        print(f"Deleted ClientTlsPolicy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exception:
        print(f"Failed to delete ClientTlsPolicy: {exception}")
# [END networksecurity_v1alpha1_networksecurity_clienttlspolicy_delete]
