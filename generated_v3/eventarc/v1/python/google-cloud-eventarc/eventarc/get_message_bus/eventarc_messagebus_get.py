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

# [START eventarc_v1_eventarc_messagebus_get]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def get_message_bus(project_id: str, location_id: str, message_bus_id: str) -> None:
    """Retrieves an Eventarc message bus.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the MessageBus.
        message_bus_id: The identifier of the MessageBus to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/messageBuses/{message_bus_id}"

    request = eventarc_v1.GetMessageBusRequest(name=name)

    try:
        response = client.get_message_bus(request=request)
        print(f"Retrieved message bus: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving message bus: {error.message}")
# [END eventarc_v1_eventarc_messagebus_get]
