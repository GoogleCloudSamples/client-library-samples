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

# [START networkservices_v1_networkservices_servicelbpolicies_list]
import google.api_core.exceptions
from google.cloud import network_services_v1


def list_service_lb_policies(project_id: str, location_id: str) -> None:
    """Lists Service LB Policies in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = network_services_v1.NetworkServicesClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_services_v1.ListServiceLbPoliciesRequest(
        parent=parent,
    )

    try:
        response = client.list_service_lb_policies(request=request)
        for service_lb_policy in response:
            print(f"Service LB Policy: {service_lb_policy.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END networkservices_v1_networkservices_servicelbpolicies_list]
