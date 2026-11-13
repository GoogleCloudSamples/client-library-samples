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

# [START networkservices_v1_networkservices_mesh_delete]
from google.api_core import exceptions
from google.cloud import network_services_v1


def delete_mesh(project_id: str, location_id: str, mesh_id: str) -> None:
    """Deletes a Service Mesh resource in Google Cloud Network Services.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
        mesh_id: The caller-chosen identifier of the Mesh to delete (for example, 'example-mesh-id').
    """
    client = network_services_v1.NetworkServicesClient()
    name = f"projects/{project_id}/locations/{location_id}/meshes/{mesh_id}"

    try:
        operation = client.delete_mesh(name=name)
        operation.result()
        print(f"Deleted mesh: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Operation failed with error: {error}")
# [END networkservices_v1_networkservices_mesh_delete]
