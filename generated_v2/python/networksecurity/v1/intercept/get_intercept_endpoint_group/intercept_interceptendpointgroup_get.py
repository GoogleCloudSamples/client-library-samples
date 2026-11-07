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

# [START networksecurity_v1_intercept_interceptendpointgroup_get]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_intercept_endpoint_group(
    project_id: str, location_id: str, intercept_endpoint_group_id: str
) -> None:
    """Retrieves an InterceptEndpointGroup resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud location where the service is located (for
          example, 'global').
        intercept_endpoint_group_id: The identifier of the
          InterceptEndpointGroup to retrieve (for example,
          'example-endpoint-group').
    """
    client = network_security_v1.InterceptClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"interceptEndpointGroups/{intercept_endpoint_group_id}"
    )

    request = network_security_v1.GetInterceptEndpointGroupRequest(
        name=name,
    )

    try:
        response = client.get_intercept_endpoint_group(request=request)
        print(f"Retrieved Intercept Endpoint Group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve Intercept Endpoint Group: {e}")
# [END networksecurity_v1_intercept_interceptendpointgroup_get]
