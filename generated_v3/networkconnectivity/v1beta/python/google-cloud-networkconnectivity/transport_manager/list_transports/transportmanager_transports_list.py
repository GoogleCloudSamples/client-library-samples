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

# [START networkconnectivity_v1beta_transportmanager_transports_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def list_transports(project_id: str, location_id: str) -> None:
    """Lists transports in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region ID (for example, 'us-central1').
    """
    client = networkconnectivity_v1beta.TransportManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = networkconnectivity_v1beta.ListTransportsRequest(parent=parent)

    try:
        response = client.list_transports(request=request)
        transports_found = False
        for transport in response:
            print(f"Transport name: {transport.name}")
            transports_found = True

        if not transports_found:
            print(f"No transports found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list transports: {error}")


# [END networkconnectivity_v1beta_transportmanager_transports_list]
