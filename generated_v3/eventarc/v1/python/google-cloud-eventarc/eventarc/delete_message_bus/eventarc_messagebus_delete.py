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

# [START eventarc_v1_eventarc_messagebus_delete]
import google.api_core.exceptions
from google.cloud import eventarc_v1


def delete_message_bus(
    project_id: str, location_id: str, message_bus_id: str
) -> None:
    """Deletes an Eventarc message bus.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the message bus is located.
        message_bus_id: The ID of the message bus to delete.
    """
    client = eventarc_v1.EventarcClient()
    name = f"projects/{project_id}/locations/{location_id}/messageBuses/{message_bus_id}"

    # Remove existing enrollments linked to the target message bus
    parent = f"projects/{project_id}/locations/{location_id}"
    try:
        for enrollment in client.list_enrollments(parent=parent):
            if enrollment.message_bus == name or enrollment.message_bus.endswith(
                f"/{message_bus_id}"
            ):
                operation = client.delete_enrollment(name=enrollment.name)
                operation.result()
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete existing enrollments: {e}")

    try:
        operation = client.delete_message_bus(name=name)
        operation.result()
        print(f"Deleted message bus: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END eventarc_v1_eventarc_messagebus_delete]
