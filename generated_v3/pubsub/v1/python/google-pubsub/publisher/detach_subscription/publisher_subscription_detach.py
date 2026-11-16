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

# [START pubsub_v1_publisher_detach_subscription]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.PublisherClient()


def detach_subscription(project_id: str, subscription_id: str) -> None:
    """Detaches a subscription from its topic using the detach_subscription method.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        subscription_id: The ID of the subscription to detach (for example,
          'example-subscription'). Must start with a letter, contain 3-255
          characters (letters, numbers, dashes, underscores, periods, tildes,
          plus, or percent signs), and cannot start with 'goog'.
    """
    subscription = f"projects/{project_id}/subscriptions/{subscription_id}"

    try:
        client.detach_subscription(request={"subscription": subscription})
        print(f"Detached subscription: {subscription}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.GoogleAPICallError,
    ) as error:
        print(f"Failed to detach subscription: {error}")
# [END pubsub_v1_publisher_detach_subscription]
