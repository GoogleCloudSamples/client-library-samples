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

# [START networkservices_v1_networkservices_servicelbpolicy_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_service_lb_policy(
    project_id: str, location_id: str, service_lb_policy_id: str
) -> None:
    """Creates a Service LB Policy in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud location (for example, 'global' or a
          region such as 'us-central1').
        service_lb_policy_id: The ID of the ServiceLbPolicy to create (for
          example, 'example-servicelbpolicy-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    service_lb_policy = network_services_v1.ServiceLbPolicy(
        description="Sample Service LB Policy",
    )

    request = network_services_v1.CreateServiceLbPolicyRequest(
        parent=parent,
        service_lb_policy_id=service_lb_policy_id,
        service_lb_policy=service_lb_policy,
    )

    try:
        operation = client.create_service_lb_policy(request=request)
        response = operation.result()
        print(f"Created Service LB Policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create Service LB Policy: {e}")


# [END networkservices_v1_networkservices_servicelbpolicy_create]
