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

# [START networksecurity_v1alpha1_ssegatewayservice_partnerssegateways_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_partner_sse_gateways(project_id: str, location_id: str) -> None:
    """Lists Partner SSE Gateways in a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region for the Partner SSE Gateways.
    """
    client = network_security_v1alpha1.SSEGatewayServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    request = network_security_v1alpha1.ListPartnerSSEGatewaysRequest(
        parent=parent,
    )

    try:
        response = client.list_partner_sse_gateways(request=request)
        found = False
        for gateway in response:
            print(f"Partner SSE Gateway name: {gateway.name}")
            found = True
        if not found:
            print(f"No Partner SSE Gateways found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END networksecurity_v1alpha1_ssegatewayservice_partnerssegateways_list]
