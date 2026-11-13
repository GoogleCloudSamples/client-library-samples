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

# [START pubsub_v1_subscriber_snapshot_get]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SubscriberClient()


def get_snapshot(project_id: str, snap_id: str) -> None:
    """Retrieves configuration details of a Cloud Pub/Sub snapshot.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        snap_id: ID of the snapshot (for example, 'example-snapshot-id').
    """
    snapshot = client.snapshot_path(project_id, snap_id)

    try:
        response = client.get_snapshot(request={"snapshot": snapshot})
        print(f"Retrieved snapshot: {response.name}")
        print(f"Target topic: {response.topic}")
        print(f"Expiration time: {response.expire_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END pubsub_v1_subscriber_snapshot_get]
