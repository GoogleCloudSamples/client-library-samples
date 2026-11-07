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

# [START networkconnectivity_v1beta_hubservice_spoke_delete]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta

client = networkconnectivity_v1beta.HubServiceClient()


def delete_spoke(project_id: str, location_id: str, spoke_id: str) -> None:
    """Use the delete_spoke method

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The Google Cloud location (region or global) where the spoke resides.
        spoke_id: The identifier of the spoke to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/spokes/{spoke_id}"

    try:
        operation = client.delete_spoke(name=name)
        operation.result()
        print(f"Deleted spoke: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkconnectivity_v1beta_hubservice_spoke_delete]
