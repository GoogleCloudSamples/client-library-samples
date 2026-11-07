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

# [START networksecurity_v1_mirroring_mirroringendpointgroup_get]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_mirroring_endpoint_group(
    project_id: str, location_id: str, mirroring_endpoint_group_id: str
) -> None:
    """Retrieves a MirroringEndpointGroup resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        mirroring_endpoint_group_id: The identifier of the MirroringEndpointGroup to retrieve (for example, 'example-endpoint-group').
    """
    client = network_security_v1.MirroringClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"mirroringEndpointGroups/{mirroring_endpoint_group_id}"
    )

    request = network_security_v1.GetMirroringEndpointGroupRequest(
        name=name,
    )

    try:
        response = client.get_mirroring_endpoint_group(request=request)
        print(f"Retrieved MirroringEndpointGroup: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve MirroringEndpointGroup: {error}")


# [END networksecurity_v1_mirroring_mirroringendpointgroup_get]
