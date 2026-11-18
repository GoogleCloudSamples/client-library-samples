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

# [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontokens_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.CrossNetworkAutomationServiceClient()


def list_service_connection_tokens(project_id: str, location_id: str) -> None:
    """Lists service connection tokens in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) ID, or 'global'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = networkconnectivity_v1.ListServiceConnectionTokensRequest(
        parent=parent,
    )

    try:
        response = client.list_service_connection_tokens(request=request)
        for token in response:
            print(f"Token: {token.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontokens_list]
