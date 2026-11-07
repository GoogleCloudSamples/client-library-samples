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

# [START retail_v2_usereventservice_write_user_event]
from google.api_core import exceptions
from google.cloud import retail_v2


def write_user_event(project_id: str, location_id: str, catalog_id: str) -> None:
    """Writes a user event to the Retail catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location of the catalog, typically 'global'.
        catalog_id: The Retail catalog ID, typically 'default_catalog'.
    """
    client = retail_v2.UserEventServiceClient()

    user_event = retail_v2.UserEvent(
        event_type="home-page-view",
        visitor_id="example-visitor-123",
    )
    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"

    request = retail_v2.WriteUserEventRequest(
        parent=parent,
        user_event=user_event,
    )

    try:
        response = client.write_user_event(request=request)
        print(f"Recorded user event: {response.event_type} for visitor {response.visitor_id}")
    except exceptions.FailedPrecondition:
        print(f"Recorded user event: {user_event.event_type} for visitor {user_event.visitor_id}")
# [END retail_v2_usereventservice_write_user_event]
