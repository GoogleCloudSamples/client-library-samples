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

# [START servicehealth_v1_servicehealth_event_get]
import google.api_core.exceptions
from google.cloud import servicehealth_v1

client = servicehealth_v1.ServiceHealthClient()


def get_event(project_id: str, location_id: str, event_id: str) -> None:
    """Retrieves detailed information about a Service Health event.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1' or 'global').
        event_id: Server-generated identifier of the Service Health event (for
          example, 'example-event-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/events/{event_id}"

    try:
        request = servicehealth_v1.GetEventRequest(name=name)
        response = client.get_event(request=request)

        print(f"Event Name: {response.name}")
        print(f"Title: {response.title}")
        print(f"State: {response.state.name}")
        print(f"Detailed State: {response.detailed_state.name}")
        print(f"Category: {response.category.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve event: {e}")


# [END servicehealth_v1_servicehealth_event_get]
