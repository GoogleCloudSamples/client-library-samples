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

# [START networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.PolicyBasedRoutingServiceClient()


def create_policy_based_route(
    policy_based_route_id: str, project_id: str, network_id: str
) -> None:
    """Creates a policy-based route in Google Cloud Network Connectivity.

    Args:
        policy_based_route_id: Unique client-assigned ID for the policy-based route.
        project_id: The Google Cloud project ID where the policy-based route is created.
        network_id: The ID or name of the existing VPC network that this route applies to.
    """
    parent = f"projects/{project_id}/locations/global"
    policy_based_route = networkconnectivity_v1.PolicyBasedRoute(
        network=f"projects/{project_id}/global/networks/{network_id}",
        filter=networkconnectivity_v1.PolicyBasedRoute.Filter(
            protocol_version=networkconnectivity_v1.PolicyBasedRoute.Filter.ProtocolVersion.IPV4
        ),
        next_hop_other_routes=networkconnectivity_v1.PolicyBasedRoute.OtherRoutes.DEFAULT_ROUTING,
        description="Sample policy-based route for IPv4 traffic",
    )

    try:
        operation = client.create_policy_based_route(
            parent=parent,
            policy_based_route_id=policy_based_route_id,
            policy_based_route=policy_based_route,
        )
        response = operation.result()
        print(f"Created policy-based route: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create policy-based route: {e}")
# [END networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
