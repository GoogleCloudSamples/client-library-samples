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

# [START networkservices_v1_networkservices_mesh_create]
from google.api_core import exceptions
from google.cloud import network_services_v1


def create_mesh(project_id: str, location_id: str, mesh_id: str) -> None:
    """Creates a service mesh resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        mesh_id: The identifier of the mesh (for example, 'example-mesh-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    mesh = network_services_v1.Mesh(
        description="A service mesh for routing and traffic management.",
    )

    try:
        operation = client.create_mesh(
            parent=parent,
            mesh_id=mesh_id,
            mesh=mesh,
        )
        response = operation.result()
        print(f"Created mesh: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create mesh: {error}")
# [END networkservices_v1_networkservices_mesh_create]
