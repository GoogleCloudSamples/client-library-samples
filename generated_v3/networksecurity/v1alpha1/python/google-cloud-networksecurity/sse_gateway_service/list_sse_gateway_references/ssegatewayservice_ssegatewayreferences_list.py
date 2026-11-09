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

# [START networksecurity_v1alpha1_ssegatewayservice_ssegatewayreferences_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_sse_gateway_references(project_id: str, location_id: str) -> None:
    """Lists SSE Gateway references in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location.
    """
    client = network_security_v1alpha1.SSEGatewayServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListSSEGatewayReferencesRequest(
        parent=parent,
    )

    try:
        response = client.list_sse_gateway_references(request=request)
        found = False
        for sse_gateway_reference in response:
            print(f"Name: {sse_gateway_reference.name}")
            found = True
        if not found:
            print("No SSE Gateway references found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END networksecurity_v1alpha1_ssegatewayservice_ssegatewayreferences_list]
