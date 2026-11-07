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

# [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.CrossNetworkAutomationServiceClient()


def get_service_connection_token(
    project_id: str, location_id: str, service_connection_token_id: str
) -> None:
    """Retrieve an existing ServiceConnectionToken resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region for the service connection token.
        service_connection_token_id: The ID of the ServiceConnectionToken to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/serviceConnectionTokens/{service_connection_token_id}"

    request = networkconnectivity_v1.GetServiceConnectionTokenRequest(
        name=name,
    )

    try:
        response = client.get_service_connection_token(request=request)
        print(f"Retrieved service connection token: {response.name}")
        print(f"Token network: {response.network}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get service connection token: {error}")
# [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_get]
