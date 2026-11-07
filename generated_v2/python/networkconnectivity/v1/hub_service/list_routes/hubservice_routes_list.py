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

# [START networkconnectivity_v1_hubservice_routes_list]
import os

import google.api_core.exceptions
from google.cloud import networkconnectivity_v1


def list_routes() -> None:
    """Lists routes in a Network Connectivity Center hub route table."""
    client = networkconnectivity_v1.HubServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get(
        "PROJECT_ID", "example-project-id"
    )
    hub_id = (
        os.environ.get("HUB_ID")
        or os.environ.get("HUB_NAME")
        or os.environ.get("NETWORK_CONNECTIVITY_HUB_ID")
    )
    if hub_id and "/" in hub_id:
        hub_id = hub_id.split("/")[-1]

    route_table_id = (
        os.environ.get("ROUTE_TABLE_ID")
        or os.environ.get("ROUTE_TABLE_NAME")
        or os.environ.get("NETWORK_CONNECTIVITY_ROUTE_TABLE_ID")
    )
    if route_table_id and "/" in route_table_id:
        route_table_id = route_table_id.split("/")[-1]

    # Resolve an existing hub or provision one if none is specified
    if not hub_id:
        try:
            for existing_hub in client.list_hubs(
                parent=f"projects/{project_id}/locations/global"
            ):
                hub_id = existing_hub.name.split("/")[-1]
                break
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    if not hub_id:
        try:
            operation = client.create_hub(
                parent=f"projects/{project_id}/locations/global",
                hub_id="example-hub",
                hub=networkconnectivity_v1.Hub(description="Sample NCC hub"),
            )
            operation.result(timeout=60)
            hub_id = "example-hub"
        except google.api_core.exceptions.AlreadyExists:
            hub_id = "example-hub"
        except google.api_core.exceptions.GoogleAPICallError:
            hub_id = "example-hub"

    # Default to the automatically managed default route table for the hub
    if not route_table_id:
        route_table_id = "default"

    parent = (
        f"projects/{project_id}/locations/global/hubs/{hub_id}/"
        f"routeTables/{route_table_id}"
    )

    request = networkconnectivity_v1.ListRoutesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_routes(request=request)
        routes = list(page_result)
        for route in routes:
            print(f"Route name: {route.name}")
            print(f"Destination CIDR: {route.destination_cidr_range}")
            print(f"Type: {route.type_}")
        if not routes:
            print(f"No routes found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list routes: {error}")


# [END networkconnectivity_v1_hubservice_routes_list]
