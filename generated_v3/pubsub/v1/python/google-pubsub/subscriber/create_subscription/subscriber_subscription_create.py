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

# [START pubsub_v1_subscriber_subscription_create]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def create_subscription(project_id: str, subscription_id: str, topic_id: str) -> None:
    """Use the create_subscription method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        subscription_id: ID of the Subscription (for example, 'example-subscription-id')
        topic_id: ID of the Topic (for example, 'example-topic-id')
    """
    name = client.subscription_path(project_id, subscription_id)
    topic = client.topic_path(project_id, topic_id)

    try:
        subscription = client.create_subscription(
            request={"name": name, "topic": topic}
        )
        print(f"Created subscription: {subscription.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Subscription {name} already exists.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create subscription: {error}")
# [END pubsub_v1_subscriber_subscription_create]
