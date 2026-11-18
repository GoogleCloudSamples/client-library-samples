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

# [START networkservices_v1beta1_networkservices_endpointpolicy_delete]
import google.api_core.exceptions
from google.cloud import network_services_v1


def delete_endpoint_policy(project_id: str, endpoint_policy_id: str) -> None:
    """Deletes an EndpointPolicy resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        endpoint_policy_id: The ID of the endpoint policy (for example, 'example-endpoint-policy-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/global/endpointPolicies/{endpoint_policy_id}"

    request = network_services_v1.DeleteEndpointPolicyRequest(
        name=name,
    )

    try:
        operation = client.delete_endpoint_policy(request=request)
        operation.result()
        print(f"Deleted endpoint policy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkservices_v1beta1_networkservices_endpointpolicy_delete]
