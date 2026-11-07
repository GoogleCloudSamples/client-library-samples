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

# [START networkservices_v1_networkservices_meshrouteviews_list]
import google.api_core.exceptions
from google.cloud import network_services_v1


def list_mesh_route_views(project_id: str, location_id: str, mesh_id: str) -> None:
    """Lists mesh route views for a specified mesh.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        mesh_id: The identifier of the mesh (for example, 'example-mesh-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}/meshes/{mesh_id}"

    request = network_services_v1.ListMeshRouteViewsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_mesh_route_views(request=request)
        count = 0
        for route_view in page_result:
            print(f"Mesh route view: {route_view.name}")
            count += 1
        if count == 0:
            print(f"No mesh route views found for {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkservices_v1_networkservices_meshrouteviews_list]
