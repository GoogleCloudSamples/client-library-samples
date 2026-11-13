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

# [START retail_rejoin_user_events]
from google.api_core import exceptions
from google.cloud import retail_v2


def rejoin_user_events(project_id: str, location_id: str, catalog_id: str) -> None:
    """Rejoins user events with the catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, typically 'global'.
        catalog_id: The catalog ID, typically 'default_catalog'.
    """
    client = retail_v2.UserEventServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    user_event_rejoin_scope = (
        retail_v2.RejoinUserEventsRequest.UserEventRejoinScope.UNJOINED_EVENTS
    )

    request = retail_v2.RejoinUserEventsRequest(
        parent=parent,
        user_event_rejoin_scope=user_event_rejoin_scope,
    )

    try:
        operation = client.rejoin_user_events(request=request)
        print(f"Operation started: {operation.operation.name}")
        response = operation.result()
        print(f"Rejoined user events count: {response.rejoined_user_events_count}")
    except (exceptions.FailedPrecondition, exceptions.InvalidArgument) as error:
        print(f"Operation response: {error}")
# [END retail_rejoin_user_events]
