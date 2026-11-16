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

# [START pubsub_v1_subscriber_subscription_update]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.protobuf import field_mask_pb2

client = pubsub_v1.SubscriberClient()


def update_subscription(project_id: str, subscription_id: str) -> None:
    """Use the update_subscription method

    Args:
        project_id: The Google Cloud project ID.
        subscription_id: The ID of the existing Pub/Sub subscription to update
            (caller-specified or server-generated when created). Must start with a
            letter, contain 3-255 characters (letters, numbers, dashes, underscores,
            periods, tildes, plus, or percent signs), and not start with 'goog'.
    """
    subscription_path = client.subscription_path(project_id, subscription_id)
    subscription = pubsub_v1.types.Subscription(
        name=subscription_path,
        labels={"env": "test"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        response = client.update_subscription(
            subscription=subscription,
            update_mask=update_mask,
        )
        print(f"Updated subscription: {response.name}")
        print(f"Labels: {response.labels}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update subscription: {exc}")
# [END pubsub_v1_subscriber_subscription_update]
