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

# [START networkservices_v1_networkservices_tcproute_update]
import google.api_core.exceptions
from google.cloud import network_services_v1
from google.protobuf import field_mask_pb2


def update_tcp_route(project_id: str, location_id: str, tcp_route_id: str) -> None:
    """Updates the description of an existing TCP route.

    Args:
        project_id: The Google Cloud project ID hosting the TCP route.
        location_id: The location of the TCP route (for example, 'global').
        tcp_route_id: The identifier of the existing TCP route to update.
    """
    client = network_services_v1.NetworkServicesClient()
    route_name = (
        f"projects/{project_id}/locations/{location_id}/tcpRoutes/{tcp_route_id}"
    )

    try:
        # Retrieve the existing route to satisfy the API validation requirement for rules.
        tcp_route = client.get_tcp_route(name=route_name)
        tcp_route.description = "Updated TCP route description"

        update_mask = field_mask_pb2.FieldMask(paths=["description"])

        operation = client.update_tcp_route(
            tcp_route=tcp_route,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated TCP route: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update TCP route: {error}")
# [END networkservices_v1_networkservices_tcproute_update]
