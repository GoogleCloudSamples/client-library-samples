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

# [START networksecurity_v1_mirroring_mirroringendpointgroupassociation_get]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_mirroring_endpoint_group_association(
    project_id: str,
    location_id: str,
    mirroring_endpoint_group_association_id: str,
) -> None:
    """Gets details of a single mirroring endpoint group association.

    Args:
        project_id: The Google Cloud project ID hosting the target mirroring endpoint group association.
        location_id: The location of the association (typically 'global').
        mirroring_endpoint_group_association_id: The identifier of the existing MirroringEndpointGroupAssociation to retrieve.
    """
    client = network_security_v1.MirroringClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"mirroringEndpointGroupAssociations/{mirroring_endpoint_group_association_id}"
    )

    request = network_security_v1.GetMirroringEndpointGroupAssociationRequest(
        name=name,
    )

    try:
        response = client.get_mirroring_endpoint_group_association(
            request=request
        )
        print(f"Retrieved association: {response.name}")
        print(f"Mirroring endpoint group: {response.mirroring_endpoint_group}")
        print(f"Network: {response.network}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(
            f"Failed to retrieve mirroring endpoint group association: {error}"
        )


# [END networksecurity_v1_mirroring_mirroringendpointgroupassociation_get]
