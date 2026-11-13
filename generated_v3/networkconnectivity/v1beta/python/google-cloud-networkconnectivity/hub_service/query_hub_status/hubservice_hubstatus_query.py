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

# [START networkconnectivity_v1beta_hubservice_query_hub_status]
from google.api_core import exceptions
from google.cloud import networkconnectivity_v1beta


def query_hub_status(project_id: str, hub_id: str) -> None:
    """Queries the status of a Network Connectivity Center hub.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The ID of the Network Connectivity Center hub.
    """
    client = networkconnectivity_v1beta.HubServiceClient()
    name = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    request = networkconnectivity_v1beta.QueryHubStatusRequest(
        name=name,
    )

    try:
        response = client.query_hub_status(request=request)
        print(f"Status query results for hub {name}:")
        count = 0
        for hub_status_entry in response:
            count += 1
            print(f"Hub status entry: {hub_status_entry}")
        if count == 0:
            print("No hub status entries found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Error querying hub status: {error}")
# [END networkconnectivity_v1beta_hubservice_query_hub_status]
