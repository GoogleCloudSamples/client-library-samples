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

# [START pubsub_v1_subscriber_pull]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def pull(project_id: str, sub_id: str) -> None:
    """Use the pull method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        sub_id: ID of the Sub (for example, 'example-sub-id')
    """
    subscription = client.subscription_path(project_id, sub_id)
    max_messages = 10

    try:
        response = client.pull(
            request={
                "subscription": subscription,
                "max_messages": max_messages,
            }
        )
        for received_message in response.received_messages:
            print(f"Received message ID: {received_message.message.message_id}")
            print(f"Data: {received_message.message.data.decode('utf-8')}")
            print(f"Ack ID: {received_message.ack_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to pull messages: {e}")


# [END pubsub_v1_subscriber_pull]
