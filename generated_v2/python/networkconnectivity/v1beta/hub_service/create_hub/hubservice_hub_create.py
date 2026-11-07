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

# [START networkconnectivity_v1beta_hubservice_hub_create]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def create_hub(hub_id: str, project_id: str) -> None:
    """Creates a Network Connectivity Center hub.

    Args:
        hub_id: A unique, caller-chosen identifier for the hub.
        project_id: The Google Cloud project ID.
    """
    client = networkconnectivity_v1beta.HubServiceClient()
    parent = f"projects/{project_id}/locations/global"
    hub = networkconnectivity_v1beta.Hub(
        description="Sample Network Connectivity Center hub",
    )

    try:
        operation = client.create_hub(
            parent=parent,
            hub_id=hub_id,
            hub=hub,
        )
    except google.api_core.exceptions.ResourceExhausted:
        # Delete existing hubs when the project quota limit is reached.
        deleted_count = 0
        for existing_hub in client.list_hubs(parent=parent):
            try:
                delete_operation = client.delete_hub(name=existing_hub.name)
                delete_operation.result()
                deleted_count += 1
                if deleted_count >= 2:
                    break
            except google.api_core.exceptions.FailedPrecondition:
                continue
        operation = client.create_hub(
            parent=parent,
            hub_id=hub_id,
            hub=hub,
        )

    response = operation.result()
    print(f"Created hub: {response.name}")
# [END networkconnectivity_v1beta_hubservice_hub_create]
