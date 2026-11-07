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

# [START networksecurity_v1_sserealmservice_sacrealm_create]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_sac_realm(
    project_id: str, sac_realm_id: str, location_id: str
) -> None:
    """Creates a SACRealm resource.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        sac_realm_id: Unique identifier for the SACRealm resource.
        location_id: The Google Cloud location ID (must be 'global').
    """
    client = network_security_v1.SSERealmServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    sac_realm = network_security_v1.SACRealm(
        security_service=(
            network_security_v1.SACRealm.SecurityService.PALO_ALTO_PRISMA_ACCESS
        )
    )

    try:
        operation = client.create_sac_realm(
            parent=parent,
            sac_realm_id=sac_realm_id,
            sac_realm=sac_realm,
        )
        try:
            response = operation.result()
        except TypeError:
            # Handle backend LRO response returning a v1beta1 type URL in v1 client
            response = network_security_v1.SACRealm.deserialize(
                operation.operation.response.value
            )
        print(f"Created SAC Realm: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create SAC Realm: {error}")


# [END networksecurity_v1_sserealmservice_sacrealm_create]
