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

# [START networkservices_v1_networkservices_meshrouteview_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_mesh_route_view(
    project_id: str, location_id: str, mesh_id: str, route_view_id: str
) -> None:
    """Retrieves a MeshRouteView resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location where the Mesh is provisioned (for example, 'global').
        mesh_id: The ID of the parent Mesh resource (for example, 'example-mesh-id').
        route_view_id: Identifier of the MeshRouteView resource.
    """
    client = network_services_v1.NetworkServicesClient()

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/meshes/{mesh_id}/routeViews/{route_view_id}"
    )

    request = network_services_v1.GetMeshRouteViewRequest(name=name)

    try:
        response = client.get_mesh_route_view(request=request)
        print(f"Retrieved MeshRouteView: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve MeshRouteView: {e}")
# [END networkservices_v1_networkservices_meshrouteview_get]
