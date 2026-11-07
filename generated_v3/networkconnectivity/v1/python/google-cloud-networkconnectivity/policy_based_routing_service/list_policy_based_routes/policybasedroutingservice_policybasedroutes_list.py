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

# [START networkconnectivity_v1_policybasedroutingservice_policybasedroutes_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.PolicyBasedRoutingServiceClient()


def list_policy_based_routes(project_id: str) -> None:
    """List policy-based routes in a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/global"

    request = networkconnectivity_v1.ListPolicyBasedRoutesRequest(
        parent=parent,
    )

    try:
        response = client.list_policy_based_routes(request=request)
        for route in response:
            print(f"Route: {route.name}")
            print(f"Network: {route.network}")
            print(f"Priority: {route.priority}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")


# [END networkconnectivity_v1_policybasedroutingservice_policybasedroutes_list]
