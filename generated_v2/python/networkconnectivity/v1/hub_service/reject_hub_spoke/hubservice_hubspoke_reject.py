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

# [START networkconnectivity_v1_hubservice_reject_hub_spoke]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.HubServiceClient()


def reject_hub_spoke(project_id: str, hub_id: str, spoke_uri: str) -> None:
    """Reject a spoke from a Network Connectivity Center hub.

    Args:
        project_id: The Google Cloud project ID of the Network Connectivity Center hub.
        hub_id: The caller-chosen identifier of the Network Connectivity Center hub.
        spoke_uri: The full URI or resource name of the spoke to reject from the hub, in the format projects/{project}/locations/{location}/spokes/{spoke}.
    """
    name = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    request = networkconnectivity_v1.RejectHubSpokeRequest(
        name=name,
        spoke_uri=spoke_uri,
    )

    try:
        operation = client.reject_hub_spoke(request=request)
        response = operation.result()
        print(f"Spoke rejection completed: {response}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Spoke rejection failed: {error}")
# [END networkconnectivity_v1_hubservice_reject_hub_spoke]
