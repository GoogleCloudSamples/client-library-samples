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

# [START pubsub_v1_subscriber_modify_ack_deadline]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def modify_ack_deadline(project_id: str, sub_id: str) -> None:
    """Modifies the acknowledgment deadline for a Pub/Sub subscription.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        sub_id: The subscription ID (for example, 'example-sub-id').
    """
    subscription = client.subscription_path(project_id, sub_id)
    ack_deadline_seconds = 30
    ack_ids = ""

    try:
        response = client.pull(
            request={"subscription": subscription, "max_messages": 1}
        )
        if response.received_messages:
            ack_ids = response.received_messages[0].ack_id
            client.modify_ack_deadline(
                request={
                    "subscription": subscription,
                    "ack_ids": [ack_ids],
                    "ack_deadline_seconds": ack_deadline_seconds,
                }
            )
            print(
                f"Modified acknowledgment deadline for {ack_ids} to "
                f"{ack_deadline_seconds} seconds."
            )
        else:
            print("No messages received to modify acknowledgment deadline.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to modify acknowledgment deadline: {e}")
# [END pubsub_v1_subscriber_modify_ack_deadline]
