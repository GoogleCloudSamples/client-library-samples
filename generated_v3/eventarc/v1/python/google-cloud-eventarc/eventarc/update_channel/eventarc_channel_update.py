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

# [START eventarc_v1_eventarc_channel_update]
import google.api_core.exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2

client = eventarc_v1.EventarcClient()


def update_channel(project_id: str, location_id: str, channel_id: str) -> None:
    """Update an Eventarc channel using the update_channel method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the channel is located.
        channel_id: The identifier of the existing channel to update.
    """
    channel_name = f"projects/{project_id}/locations/{location_id}/channels/{channel_id}"

    channel = eventarc_v1.Channel(
        name=channel_name,
        labels={"updated": "true"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        # Initiate the long-running operation to update the channel.
        operation = client.update_channel(
            channel=channel,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated channel: {response.name}")
        print(f"Channel state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update channel: {e}")
# [END eventarc_v1_eventarc_channel_update]
