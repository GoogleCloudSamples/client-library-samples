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

# [START pubsub_v1_publisher_publish]
import google.api_core.exceptions
from google import pubsub_v1

client = pubsub_v1.PublisherClient()


def publish(project_id: str, topic_id: str) -> None:
    """Publish messages to a Cloud Pub/Sub topic.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        topic_id: The ID of the topic (for example, 'example-topic-id').
    """
    topic = f"projects/{project_id}/topics/{topic_id}"
    messages = [
        pubsub_v1.PubsubMessage(
            data=b"Example message data",
        ),
    ]

    try:
        response = client.publish(topic=topic, messages=messages)
        print(f"Published message IDs: {response.message_ids}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END pubsub_v1_publisher_publish]
