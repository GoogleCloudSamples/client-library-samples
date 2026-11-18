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

# [START networkservices_v1_networkservices_tcproute_get]
from google.api_core import exceptions
from google.cloud import network_services_v1


def get_tcp_route(project_id: str, location_id: str, tcp_route_id: str) -> None:
    """Retrieves a TcpRoute resource.

    Args:
        project_id: The Google Cloud project ID of the existing TcpRoute resource.
        location_id: The Google Cloud region or location for the TcpRoute (for example, 'global' or 'us-central1').
        tcp_route_id: The caller-assigned identifier of the existing TcpRoute to retrieve.
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/tcpRoutes/{tcp_route_id}"
    request = network_services_v1.GetTcpRouteRequest(name=name)

    try:
        response = client.get_tcp_route(request=request)
        print(f"Retrieved TCP route: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error retrieving TCP route: {error}")
# [END networkservices_v1_networkservices_tcproute_get]
