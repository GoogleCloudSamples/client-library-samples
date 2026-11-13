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

# [START networkconnectivity_v1alpha1_hubservice_spoke_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1alpha1

client = networkconnectivity_v1alpha1.HubServiceClient()


def get_spoke(project_id: str, location_id: str, spoke_id: str) -> None:
    """Retrieve details of an existing Network Connectivity Center spoke.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location where the Spoke resides.
        spoke_id: The identifier of the Spoke to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/spokes/{spoke_id}"

    request = networkconnectivity_v1alpha1.GetSpokeRequest(name=name)

    try:
        response = client.get_spoke(request=request)
        print(f"Retrieved spoke: {response.name}")
        print(f"Hub: {response.hub}")
        print(f"State: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error occurred while retrieving spoke: {error}")
# [END networkconnectivity_v1alpha1_hubservice_spoke_get]
