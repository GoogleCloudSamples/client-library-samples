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

# [START retail_v2beta_usereventservice_rejoin_user_events]
import os

from google.api_core import exceptions
from google.cloud import retail_v2beta


def rejoin_user_events() -> None:
    """Rejoin user events in a catalog with the latest product catalog data."""
    client = retail_v2beta.UserEventServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    parent = f"projects/{project_id}/locations/global/catalogs/default_catalog"

    request = retail_v2beta.RejoinUserEventsRequest(
        parent=parent,
        user_event_rejoin_scope=retail_v2beta.RejoinUserEventsRequest.UserEventRejoinScope.UNJOINED_EVENTS,
    )

    try:
        operation = client.rejoin_user_events(request=request)
        print("Waiting for the rejoin operation to complete...")
        response = operation.result()
        print(f"Rejoined user events count: {response.rejoined_user_events_count}")
    except (exceptions.InvalidArgument, exceptions.FailedPrecondition) as exc:
        print(f"Rejoin user events request processed with status: {exc.message}")


# [END retail_v2beta_usereventservice_rejoin_user_events]
