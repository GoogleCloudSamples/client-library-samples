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

# [START networkservices_v1_networkservices_mesh_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_mesh(project_id: str, location_id: str, mesh_id: str) -> None:
    """Retrieves details of an existing Mesh resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (typically 'global').
        mesh_id: The identifier of the existing Mesh resource to retrieve.
    """
    client = network_services_v1.NetworkServicesClient()

    name = f"projects/{project_id}/locations/{location_id}/meshes/{mesh_id}"

    request = network_services_v1.GetMeshRequest(name=name)

    try:
        response = client.get_mesh(request=request)
        print(f"Retrieved mesh: {response.name}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve mesh: {error.message}")
# [END networkservices_v1_networkservices_mesh_get]
