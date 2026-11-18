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

# [START networkservices_v1_networkservices_servicelbpolicy_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_service_lb_policy(
    project_id: str, location_id: str, service_lb_policy_id: str
) -> None:
    """Retrieves a Service LB Policy resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        service_lb_policy_id: The ID of the ServiceLbPolicy (for example, 'example-servicelbpolicy-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/serviceLbPolicies/{service_lb_policy_id}"

    request = network_services_v1.GetServiceLbPolicyRequest(name=name)

    try:
        response = client.get_service_lb_policy(request=request)
        print(f"Retrieved Service LB Policy: {response.name}")
        print(f"Load balancing algorithm: {response.load_balancing_algorithm}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve Service LB Policy: {error}")
# [END networkservices_v1_networkservices_servicelbpolicy_get]
