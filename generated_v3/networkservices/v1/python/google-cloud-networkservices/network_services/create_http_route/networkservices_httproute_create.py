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

# [START networkservices_v1_networkservices_httproute_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_http_route(project_id: str, location_id: str, http_route_id: str) -> None:
    """Creates an HTTP route in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        http_route_id: ID of the HttpRoute (for example, 'example-httproute-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    # Define the route matching rule
    rule_match = network_services_v1.HttpRoute.RouteMatch(
        prefix_match="/",
    )
    route_rule = network_services_v1.HttpRoute.RouteRule(
        matches=[rule_match],
    )

    http_route = network_services_v1.HttpRoute(
        description="Routing configuration for example domain",
        hostnames=["example.com"],
        rules=[route_rule],
    )

    request = network_services_v1.CreateHttpRouteRequest(
        parent=parent,
        http_route_id=http_route_id,
        http_route=http_route,
    )

    try:
        operation = client.create_http_route(request=request)
        response = operation.result()
        print(f"Created HTTP route: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create HTTP route: {error.message}")


# [END networkservices_v1_networkservices_httproute_create]
