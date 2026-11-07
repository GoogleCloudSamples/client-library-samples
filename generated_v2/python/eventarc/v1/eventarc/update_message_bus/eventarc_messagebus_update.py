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

# [START eventarc_v1_eventarc_messagebus_update]
import google.api_core.exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2

client = eventarc_v1.EventarcClient()


def update_message_bus(project_id: str, location_id: str, message_bus_id: str) -> None:
    """Use the update_message_bus method to update a MessageBus resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the MessageBus is hosted (for example, 'us-central1').
        message_bus_id: The ID of the MessageBus to update. Must start with a lowercase letter and contain only lowercase letters, digits, or hyphens.
    """
    message_bus = eventarc_v1.MessageBus(
        name=f"projects/{project_id}/locations/{location_id}/messageBuses/{message_bus_id}",
        display_name="Updated Example Message Bus",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_message_bus(
            message_bus=message_bus,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated message bus: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update message bus: {error}")
# [END eventarc_v1_eventarc_messagebus_update]
