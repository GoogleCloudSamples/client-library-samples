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

# [START eventarc_v1_eventarc_trigger_create]
import google.api_core.exceptions
from google.cloud import eventarc_v1


def create_trigger(
    trigger_id: str,
    project_id: str,
    location_id: str,
    destination_run_service_id: str,
) -> None:
    """Create an Eventarc trigger.

    Args:
        trigger_id: The unique identifier for the trigger (for example, 'example-trigger').
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for the trigger (for example, 'us-central1').
        destination_run_service_id: The name of the destination Cloud Run service receiving events (for example, 'example-service').
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    trigger = eventarc_v1.Trigger(
        name=f"{parent}/triggers/{trigger_id}",
        event_filters=[
            eventarc_v1.EventFilter(
                attribute="type",
                value="google.cloud.pubsub.topic.v1.messagePublished",
            )
        ],
        destination=eventarc_v1.Destination(
            cloud_run=eventarc_v1.CloudRun(
                service=destination_run_service_id,
                region=location_id,
            )
        ),
    )

    try:
        operation = client.create_trigger(
            parent=parent,
            trigger=trigger,
            trigger_id=trigger_id,
        )
        response = operation.result()
        print(f"Created trigger: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create trigger: {error}")


# [END eventarc_v1_eventarc_trigger_create]
