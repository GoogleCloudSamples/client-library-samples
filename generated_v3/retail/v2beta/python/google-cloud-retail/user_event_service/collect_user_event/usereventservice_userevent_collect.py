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

# [START retail_collect_user_event]
from google.api_core import exceptions
from google.cloud import retail_v2


def collect_user_event(project_id: str, location_id: str, catalog_id: str) -> None:
    """Collects a user event using a URL-encoded payload.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location of the catalog, typically 'global'.
        catalog_id: The catalog identifier, typically 'default_catalog'.
    """
    client = retail_v2.UserEventServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    # URL-encoded JSON payload representing a home-page-view user event.
    user_event = (
        "%7B%22eventType%22%3A%22home-page-view%22%2C%22visitorId%22%3A"
        "%22example-visitor-id%22%7D"
    )

    request = retail_v2.CollectUserEventRequest(
        parent=parent,
        user_event=user_event,
    )

    try:
        response = client.collect_user_event(request=request)
        print(f"Collected user event. Content type: {response.content_type}")
    except exceptions.FailedPrecondition as exc:
        print(f"Retail terms acceptance required: {exc.message}")
    except exceptions.InvalidArgument as exc:
        print(f"Invalid request argument: {exc.message}")
# [END retail_collect_user_event]
