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

# [START retail_v2_usereventservice_collect_user_event]
import urllib.parse

from google.api_core import exceptions
from google.cloud import retail_v2


def collect_user_event(
    project_id: str,
    location_id: str = "global",
    catalog_id: str = "default_catalog",
) -> None:
    """Collects a user event for the specified catalog.

    Args:
        project_id: Google Cloud project ID.
        location_id: Geographic location of the catalog.
        catalog_id: Retail catalog ID.
    """
    client = retail_v2.UserEventServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    )
    user_event = urllib.parse.quote(
        '{"eventType": "home-page-view", "visitorId": "example-visitor-1"}'
    )

    request = retail_v2.CollectUserEventRequest(
        parent=parent,
        user_event=user_event,
    )

    try:
        response = client.collect_user_event(request=request)
        print(f"Collected user event: {response.content_type}")
    except exceptions.FailedPrecondition as exc:
        print(f"Precondition not met: {exc.message}")
    except exceptions.InvalidArgument as exc:
        print(f"Invalid argument provided: {exc.message}")
# [END retail_v2_usereventservice_collect_user_event]
