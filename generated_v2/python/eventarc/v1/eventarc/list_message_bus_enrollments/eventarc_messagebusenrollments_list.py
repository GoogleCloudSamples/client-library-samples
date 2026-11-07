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

# [START eventarc_v1_eventarc_messagebusenrollments_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def list_message_bus_enrollments(
    project_id: str, location_id: str, message_bus_id: str
) -> None:
    """List enrollments associated with an Eventarc message bus.

    Args:
        project_id: The Google Cloud project ID containing the message bus.
        location_id: The Google Cloud region where the message bus resides (for
          example, 'us-central1').
        message_bus_id: The caller-chosen identifier of the message bus,
          matching '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/messageBuses/{message_bus_id}"
    )

    request = eventarc_v1.ListMessageBusEnrollmentsRequest(
        parent=parent,
    )

    try:
        response = client.list_message_bus_enrollments(request=request)
        for enrollment in response:
            print(f"Enrollment: {enrollment}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list message bus enrollments: {error}")


# [END eventarc_v1_eventarc_messagebusenrollments_list]
