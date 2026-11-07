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

# [START eventarc_v1_eventarc_messagebuses_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def list_message_buses(project_id: str, location_id: str) -> None:
    """Lists Eventarc message buses in a location.

    Args:
        project_id: The Google Cloud project ID hosting the message buses.
        location_id: The Google Cloud location, for example 'us-central1' or 'global'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = eventarc_v1.ListMessageBusesRequest(parent=parent)

    try:
        response = client.list_message_buses(request=request)
        for message_bus in response:
            print(f"Message bus: {message_bus.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing message buses: {error}")
# [END eventarc_v1_eventarc_messagebuses_list]
