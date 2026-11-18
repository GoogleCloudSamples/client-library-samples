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

# [START networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def list_remote_transport_profiles(project_id: str, location_id: str) -> None:
    """Lists remote transport profiles in a specific Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID where Network Connectivity Center transports are supported.
    """
    client = networkconnectivity_v1beta.TransportManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = networkconnectivity_v1beta.ListRemoteTransportProfilesRequest(
        parent=parent
    )

    try:
        response = client.list_remote_transport_profiles(request=request)
        count = 0
        for profile in response:
            print(f"Remote transport profile name: {profile.name}")
            count += 1
        if count == 0:
            print(f"No remote transport profiles found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]
