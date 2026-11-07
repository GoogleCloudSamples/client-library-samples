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

# [START networkservices_v1_networkservices_tcproute_delete]
import google.api_core.exceptions
from google.cloud import network_services_v1


def delete_tcp_route(project_id: str, location_id: str, tcp_route_id: str) -> None:
    """Deletes a TCP route in Google Cloud Network Services.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the route is deployed (for example, 'us-central1').
        tcp_route_id: The ID of the TcpRoute to delete (for example, 'example-tcproute-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/tcpRoutes/{tcp_route_id}"

    try:
        operation = client.delete_tcp_route(name=name)
        # DeleteTcpRoute returns a long-running operation; block until completion.
        operation.result()
        print(f"Deleted TCP route: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete TCP route: {e}")
# [END networkservices_v1_networkservices_tcproute_delete]
