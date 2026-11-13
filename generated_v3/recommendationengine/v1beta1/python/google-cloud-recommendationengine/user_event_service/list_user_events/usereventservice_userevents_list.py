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

# [START recommendationengine_v1beta1_usereventservice_userevents_list]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1

client = recommendationengine_v1beta1.UserEventServiceClient()


def list_user_events(project_id: str, location_id: str) -> None:
    """Use the list_user_events method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID. For Recommendation Engine, this must be 'global'.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/catalogs/"
        "default_catalog/eventStores/default_event_store"
    )

    request = recommendationengine_v1beta1.ListUserEventsRequest(
        parent=parent,
    )

    try:
        pager = client.list_user_events(request=request)
        for user_event in pager:
            print(f"Event type: {user_event.event_type}")
            print(f"User info: {user_event.user_info.user_id}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END recommendationengine_v1beta1_usereventservice_userevents_list]
