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

# [START recommendationengine_v1beta1_usereventservice_import_user_events]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1


def import_user_events(
    project_id: str, location_id: str, catalog_id: str, event_store_id: str
) -> None:
    """Imports user events into the Recommendation Engine event store.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the Recommendation Engine resource, which
          must be 'global'.
        catalog_id: The catalog identifier, typically 'default_catalog'.
        event_store_id: The event store identifier, typically
          'default_event_store'.
    """
    client = recommendationengine_v1beta1.UserEventServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}/"
        f"eventStores/{event_store_id}"
    )

    user_event = recommendationengine_v1beta1.UserEvent(
        event_type="home-page-view",
        user_info=recommendationengine_v1beta1.UserInfo(
            visitor_id="example-visitor-id"
        ),
    )
    inline_source = recommendationengine_v1beta1.UserEventInlineSource(
        user_events=[user_event]
    )
    input_config = recommendationengine_v1beta1.InputConfig(
        user_event_inline_source=inline_source
    )

    try:
        operation = client.import_user_events(
            parent=parent,
            input_config=input_config,
        )
        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()
        print(
            "Import completed with joined events: "
            f"{response.import_summary.joined_events_count}"
        )
        print(
            "Import completed with unjoined events: "
            f"{response.import_summary.unjoined_events_count}"
        )
    except google.api_core.exceptions.MethodNotImplemented:
        print(
            "Recommendation Engine v1beta1 user event ingestion is not "
            "supported for GA projects. Cloud Retail v2 must be used instead."
        )
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call encountered an issue: {exc.message}")
# [END recommendationengine_v1beta1_usereventservice_import_user_events]
