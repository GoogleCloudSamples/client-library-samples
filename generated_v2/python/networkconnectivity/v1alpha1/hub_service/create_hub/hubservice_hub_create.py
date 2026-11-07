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

# [START networkconnectivity_v1alpha1_hubservice_hub_create]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1alpha1

client = networkconnectivity_v1alpha1.HubServiceClient()


def create_hub(project_id: str, hub_id: str) -> None:
    """Use the create_hub method

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The caller-specified ID to assign to the new Hub. Must be unique within the parent project.
    """
    parent = f"projects/{project_id}/locations/global"
    hub = networkconnectivity_v1alpha1.Hub(
        description="Sample Network Connectivity Center Hub"
    )

    try:
        operation = client.create_hub(
            parent=parent,
            hub_id=hub_id,
            hub=hub,
        )
        response = operation.result()
        print(f"Created Hub: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END networkconnectivity_v1alpha1_hubservice_hub_create]
