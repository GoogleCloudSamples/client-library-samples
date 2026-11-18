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

# [START networkservices_v1_networkservices_httproute_get]
from google.api_core import exceptions
from google.cloud import network_services_v1


def get_http_route(project_id: str, location_id: str, http_route_id: str) -> None:
    """Retrieves an HttpRoute.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        http_route_id: ID of the HttpRoute (for example, 'example-httproute-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/httpRoutes/{http_route_id}"

    request = network_services_v1.GetHttpRouteRequest(
        name=name,
    )

    try:
        response = client.get_http_route(request=request)
        print(f"Retrieved HttpRoute: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve HttpRoute: {error}")
# [END networkservices_v1_networkservices_httproute_get]
