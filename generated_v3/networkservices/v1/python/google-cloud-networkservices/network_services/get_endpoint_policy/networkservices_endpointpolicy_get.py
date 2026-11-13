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

# [START networkservices_v1_networkservices_endpointpolicy_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_endpoint_policy(
    project_id: str, location_id: str, endpoint_policy_id: str
) -> None:
    """Retrieves an existing EndpointPolicy resource.

    Args:
        project_id: The Google Cloud project ID containing the EndpointPolicy (for example, 'example-project-id').
        location_id: The Google Cloud region or location where the EndpointPolicy is located (for example, 'global' or 'us-central1').
        endpoint_policy_id: The identifier of the EndpointPolicy to retrieve (for example, 'example-endpointpolicy-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/endpointPolicies/{endpoint_policy_id}"

    request = network_services_v1.GetEndpointPolicyRequest(name=name)

    try:
        response = client.get_endpoint_policy(request=request)
        print(f"Endpoint Policy Name: {response.name}")
        print(f"Endpoint Policy Type: {response.type_}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve EndpointPolicy: {e}")
# [END networkservices_v1_networkservices_endpointpolicy_get]
