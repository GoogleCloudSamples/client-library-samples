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

# [START pubsub_v1_subscriber_seek]
import datetime

import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.protobuf import timestamp_pb2

client = pubsub_v1.SubscriberClient()


def seek(project_id: str, subscription_id: str) -> None:
    """Use the seek method

    Args:
        project_id: The Google Cloud project ID.
        subscription_id: The ID of the Pub/Sub subscription to seek.
    """
    subscription = f"projects/{project_id}/subscriptions/{subscription_id}"
    target_time = datetime.datetime.now(
        tz=datetime.timezone.utc
    ) - datetime.timedelta(hours=1)
    time = timestamp_pb2.Timestamp()
    time.FromDatetime(target_time)

    try:
        client.seek(
            request={
                "subscription": subscription,
                "time": time,
            }
        )
        print(f"Seek operation completed for subscription: {subscription}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Seek operation failed: {error}")
# [END pubsub_v1_subscriber_seek]
