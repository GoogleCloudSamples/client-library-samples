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

# [START networkconnectivity_v1beta_hubservice_hub_delete]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta

client = networkconnectivity_v1beta.HubServiceClient()


def delete_hub(project_id: str, hub_id: str) -> None:
    """Deletes a Network Connectivity Center hub.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The ID of the Network Connectivity Center hub to delete.
    """
    name = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    try:
        operation = client.delete_hub(name=name)
        operation.result()
        print(f"Deleted hub: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Hub not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete hub: {e.message}")
# [END networkconnectivity_v1beta_hubservice_hub_delete]
