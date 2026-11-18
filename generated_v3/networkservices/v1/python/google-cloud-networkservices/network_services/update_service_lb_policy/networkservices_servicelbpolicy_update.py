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

# [START networkservices_v1_networkservices_servicelbpolicy_update]
import google.api_core.exceptions
from google.cloud import network_services_v1
from google.protobuf import field_mask_pb2


def update_service_lb_policy(
    project_id: str, location_id: str, service_lb_policy_id: str
) -> None:
    """Updates an existing ServiceLbPolicy resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        service_lb_policy_id: The identifier of the existing ServiceLbPolicy.
    """
    client = network_services_v1.NetworkServicesClient()

    resource_name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/serviceLbPolicies/{service_lb_policy_id}"
    )

    service_lb_policy = network_services_v1.ServiceLbPolicy(
        name=resource_name,
        description="Updated Service LB Policy",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = network_services_v1.UpdateServiceLbPolicyRequest(
        service_lb_policy=service_lb_policy,
        update_mask=update_mask,
    )

    try:
        operation = client.update_service_lb_policy(request=request)
        response = operation.result()
        print(f"Updated Service LB Policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update Service LB Policy: {e}")
# [END networkservices_v1_networkservices_servicelbpolicy_update]
