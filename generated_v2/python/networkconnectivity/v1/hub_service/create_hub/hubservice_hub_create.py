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

# [START networkconnectivity_v1_hubservice_hub_create]
import os

import google.api_core.exceptions
from google.cloud import networkconnectivity_v1


def create_hub(hub_id: str) -> None:
    """Creates a Network Connectivity Center hub.

    Args:
        hub_id: Identifier of the hub (for example, 'example-hub-id').
    """
    client = networkconnectivity_v1.HubServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    parent = f"projects/{project_id}/locations/global"
    hub = networkconnectivity_v1.Hub(
        description="Network Connectivity Center hub",
        labels={"environment": "production"},
    )

    try:
        operation = client.create_hub(
            parent=parent,
            hub_id=hub_id,
            hub=hub,
        )
        response = operation.result()
        print(f"Created hub: {response.name}")
        print(f"Hub state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create hub: {error}")
# [END networkconnectivity_v1_hubservice_hub_create]
