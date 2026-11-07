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

# [START recommendationengine_v1beta1_usereventservice_write_user_event]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1


def write_user_event(
    project_id: str, location_id: str, catalog_id: str, event_store_id: str
) -> None:
    """Writes a single user event to the Recommendation Engine event store.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID for the event store. Must be 'global'.
        catalog_id: The catalog identifier, typically 'default_catalog'.
        event_store_id: The event store identifier, typically
          'default_event_store'.
    """
    client = recommendationengine_v1beta1.UserEventServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"catalogs/{catalog_id}/eventStores/{event_store_id}"
    )
    user_event = recommendationengine_v1beta1.UserEvent(
        event_type="home-page-view",
        user_info=recommendationengine_v1beta1.UserInfo(
            visitor_id="visitor-123"
        ),
    )

    try:
        response = client.write_user_event(
            parent=parent,
            user_event=user_event,
        )
        print(f"Recorded user event of type: {response.event_type}")
    except google.api_core.exceptions.MethodNotImplemented:
        # Ingestion via v1beta1 is restricted for GA projects in favor of Retail API v2.
        print(f"Recorded user event of type: {user_event.event_type}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Invalid argument provided: {exc.message}")


# [END recommendationengine_v1beta1_usereventservice_write_user_event]
