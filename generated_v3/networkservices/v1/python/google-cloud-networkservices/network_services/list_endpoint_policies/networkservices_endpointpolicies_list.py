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

# [START networkservices_v1_networkservices_endpointpolicies_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import network_services_v1


def list_endpoint_policies(project_id: str, location_id: str) -> None:
    """Lists endpoint policies in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = network_services_v1.NetworkServicesClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_services_v1.ListEndpointPoliciesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_endpoint_policies(request=request)
        for endpoint_policy in page_result:
            print(f"Endpoint policy name: {endpoint_policy.name}")
            print(f"Endpoint policy type: {endpoint_policy.type_}")
    except GoogleAPICallError as error:
        print(f"Failed to list endpoint policies: {error}")
# [END networkservices_v1_networkservices_endpointpolicies_list]
