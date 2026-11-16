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

# [START pubsub_v1_publisher_topic_get]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.PublisherClient()


def get_topic(project_id: str, topic_id: str) -> None:
    """Use the get_topic method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        topic_id: ID of the Topic (for example, 'example-topic-id')
    """
    topic = f"projects/{project_id}/topics/{topic_id}"

    try:
        response = client.get_topic(request={"topic": topic})
        print(f"Retrieved topic: {response.name}")
    except google.api_core.exceptions.NotFound as exc:
        print(f"Topic not found: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END pubsub_v1_publisher_topic_get]
