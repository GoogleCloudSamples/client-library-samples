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

# [START networkconnectivity_v1alpha1_hubservice_hub_update]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1alpha1
from google.protobuf import field_mask_pb2

client = networkconnectivity_v1alpha1.HubServiceClient()


def update_hub(project_id: str, hub_id: str) -> None:
    """Use the update_hub method

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The ID of the Hub to update.
    """
    hub = networkconnectivity_v1alpha1.Hub(
        name=f"projects/{project_id}/locations/global/hubs/{hub_id}",
        description="Updated Hub description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_hub(
            hub=hub,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated Hub: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update Hub: {error}")
# [END networkconnectivity_v1alpha1_hubservice_hub_update]
