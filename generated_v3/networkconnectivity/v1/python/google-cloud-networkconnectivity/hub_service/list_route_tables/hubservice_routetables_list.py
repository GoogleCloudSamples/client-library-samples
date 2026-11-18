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

# [START networkconnectivity_v1_hubservice_routetables_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.HubServiceClient()


def list_route_tables(project_id: str, hub_id: str) -> None:
    """Lists route tables in a Network Connectivity Center hub.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The caller-chosen identifier of the Network Connectivity Center hub.
    """
    parent = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    request = networkconnectivity_v1.ListRouteTablesRequest(
        parent=parent,
    )

    try:
        response = client.list_route_tables(request=request)
        for route_table in response:
            print(f"Route table name: {route_table.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list route tables: {error}")
# [END networkconnectivity_v1_hubservice_routetables_list]
