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

# [START networkconnectivity_v1beta_hubservice_routetable_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta

client = networkconnectivity_v1beta.HubServiceClient()


def get_route_table(project_id: str, hub_id: str, route_table_id: str) -> None:
    """Retrieve details of a Network Connectivity Center route table.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The Network Connectivity Center hub ID.
        route_table_id: The Network Connectivity Center route table ID.
    """
    name = (
        f"projects/{project_id}/locations/global/hubs/{hub_id}"
        f"/routeTables/{route_table_id}"
    )

    request = networkconnectivity_v1beta.GetRouteTableRequest(
        name=name,
    )

    try:
        response = client.get_route_table(request=request)
        print(f"Route table name: {response.name}")
        print(f"Route table state: {response.state}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve route table: {error.message}")
# [END networkconnectivity_v1beta_hubservice_routetable_get]
