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

# [START pubsub_v1_subscriber_snapshot_update]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.protobuf import field_mask_pb2

client = pubsub_v1.SubscriberClient()


def update_snapshot(project_id: str, snapshot_id: str) -> None:
    """Update a Pub/Sub snapshot.

    Args:
        project_id: The Google Cloud project ID.
        snapshot_id: The ID of the Pub/Sub snapshot to update.
    """
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    snapshot = pubsub_v1.types.Snapshot(
        name=f"projects/{project_id}/snapshots/{snapshot_id}",
        labels={"env": "dev"},
    )

    try:
        response = client.update_snapshot(
            request={"snapshot": snapshot, "update_mask": update_mask}
        )
        print(f"Updated snapshot: {response.name}")
        print(f"Labels: {dict(response.labels)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update snapshot: {error}")
# [END pubsub_v1_subscriber_snapshot_update]
