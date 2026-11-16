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

# [START pubsub_v1_subscriber_snapshot_create]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def create_snapshot(project_id: str, snap_id: str, sub_id: str) -> None:
    """Use the create_snapshot method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        snap_id: ID of the Snap (for example, 'example-snap-id')
        sub_id: ID of the Sub (for example, 'example-sub-id')
    """
    name = client.snapshot_path(project_id, snap_id)
    subscription = client.subscription_path(project_id, sub_id)

    try:
        response = client.create_snapshot(name=name, subscription=subscription)
        print(f"Created snapshot: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create snapshot due to an API error: {e}")


# [END pubsub_v1_subscriber_snapshot_create]
