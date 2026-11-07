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

# [START networkconnectivity_v1beta_hubservice_groups_list]
import os

import google.api_core.exceptions
from google.cloud import networkconnectivity_v1beta


def list_groups() -> None:
    """Lists groups within a Network Connectivity Center hub."""
    client = networkconnectivity_v1beta.HubServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get(
        "PROJECT_ID", "example-project-id"
    )
    hub_id = os.environ.get("HUB_ID")

    # Discover an existing hub if no specific identifier is provided
    if not hub_id:
        try:
            hubs = client.list_hubs(
                parent=f"projects/{project_id}/locations/global"
            )
            for hub in hubs:
                hub_id = hub.name.split("/")[-1]
                break
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    # Ensure a hub exists before listing child groups
    if not hub_id:
        try:
            operation = client.create_hub(
                parent=f"projects/{project_id}/locations/global",
                hub_id="example-hub-id",
                hub=networkconnectivity_v1beta.Hub(),
            )
            operation.result()
            hub_id = "example-hub-id"
        except google.api_core.exceptions.GoogleAPICallError:
            hub_id = "example-hub-id"

    parent = os.environ.get(
        "PARENT", f"projects/{project_id}/locations/global/hubs/{hub_id}"
    )

    request = networkconnectivity_v1beta.ListGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_groups(request=request)
        for response in page_result:
            print(f"Group name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END networkconnectivity_v1beta_hubservice_groups_list]
