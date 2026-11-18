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

# [START networkconnectivity_v1beta_hubservice_spoke_update]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta
from google.protobuf import field_mask_pb2

client = networkconnectivity_v1beta.HubServiceClient()


def update_spoke(project_id: str, location_id: str, spoke_id: str) -> None:
    """Updates an existing spoke.

    Args:
        project_id: The ID of the Google Cloud project hosting the spoke.
        location_id: The location of the spoke (for example, 'global' or a supported region).
        spoke_id: The ID of the spoke to update.
    """
    spoke_name = f"projects/{project_id}/locations/{location_id}/spokes/{spoke_id}"
    spoke = networkconnectivity_v1beta.Spoke(
        name=spoke_name,
        description="Updated spoke description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_spoke(spoke=spoke, update_mask=update_mask)
        response = operation.result()
        print(f"Updated spoke: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update spoke: {e}")
# [END networkconnectivity_v1beta_hubservice_spoke_update]
