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

# [START recommendationengine_v1beta1_usereventservice_purge_user_events]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1

try:
    from google.cloud import retail_v2
except ImportError:
    retail_v2 = None


def purge_user_events(project_id: str, catalog_id: str, event_store_id: str) -> None:
    """Purges user events in an event store based on a filter condition.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        catalog_id: ID of the Catalog (for example, 'example-catalog-id').
        event_store_id: ID of the EventStore (for example, 'example-eventstore-id').
    """
    filter = 'eventType = "detail-page-view"'
    parent = (
        f"projects/{project_id}/locations/global/catalogs/{catalog_id}"
        f"/eventStores/{event_store_id}"
    )
    force = True

    client = recommendationengine_v1beta1.UserEventServiceClient()
    request = recommendationengine_v1beta1.PurgeUserEventsRequest(
        parent=parent,
        filter=filter,
        force=force,
    )

    try:
        operation = client.purge_user_events(request=request)
        print("Purge operation in progress...")
        response = operation.result()
        print(f"Purged user events count: {response.purged_events_count}")
    except google.api_core.exceptions.MethodNotImplemented:
        # GA customers must use the v2 Retail API to purge user events
        if retail_v2 is not None:
            retail_client = retail_v2.UserEventServiceClient()
            retail_parent = (
                f"projects/{project_id}/locations/global/catalogs/{catalog_id}"
            )
            retail_request = retail_v2.PurgeUserEventsRequest(
                parent=retail_parent,
                filter=filter,
                force=force,
            )
            operation = retail_client.purge_user_events(request=retail_request)
            print("Purge operation in progress...")
            response = operation.result()
            print(f"Purged user events count: {response.purged_events_count}")
        else:
            print("Purge operation requires Retail v2 API for GA projects.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Purge operation encountered an error: {exc.message}")
# [END recommendationengine_v1beta1_usereventservice_purge_user_events]
