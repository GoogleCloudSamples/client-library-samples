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

# [START eventarc_v1_eventarc_enrollment_create]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def create_enrollment(
    enrollment_id: str, project_id: str, location_id: str, message_bus_id: str
) -> None:
    """Use the create_enrollment method

    Args:
        enrollment_id: The user-provided ID to be assigned to the Enrollment.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        message_bus_id: The ID of the MessageBus to subscribe to.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    message_bus_path = (
        f"projects/{project_id}/locations/{location_id}/messageBuses/{message_bus_id}"
    )
    destination_pipeline = (
        f"projects/{project_id}/locations/{location_id}/pipelines/example-pipeline"
    )

    enrollment = eventarc_v1.Enrollment(
        cel_match='message.type == "google.cloud.pubsub.topic.v1.messagePublished"',
        message_bus=message_bus_path,
        destination=destination_pipeline,
    )

    try:
        operation = client.create_enrollment(
            parent=parent,
            enrollment=enrollment,
            enrollment_id=enrollment_id,
        )
        response = operation.result()
        print(f"Created enrollment: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create enrollment: {e}")
# [END eventarc_v1_eventarc_enrollment_create]
