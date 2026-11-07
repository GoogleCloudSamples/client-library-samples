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

# [START pubsub_v1_publisher_topic_update]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.protobuf import field_mask_pb2

client = pubsub_v1.PublisherClient()


def update_topic(project_id: str, topic_id: str) -> None:
    """Use the update_topic method

    Args:
        project_id: The Google Cloud project ID.
        topic_id: The ID of the Pub/Sub topic to update. Must start with a letter, contain 3 to 255 letters, numbers, dashes, underscores, periods, tildes, plus or percent signs, and not start with 'goog'.
    """
    topic = pubsub_v1.types.Topic(
        name=f"projects/{project_id}/topics/{topic_id}",
        labels={"environment": "dev"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        response = client.update_topic(
            request={"topic": topic, "update_mask": update_mask}
        )
        print(f"Updated topic: {response.name}")
        print(f"Labels: {response.labels}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END pubsub_v1_publisher_topic_update]
