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

# [START monitoring_v3_notificationchannelservice_notificationchannel_update]
import google.api_core.exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2

client = monitoring_v3.NotificationChannelServiceClient()


def update_notification_channel(project_id: str, notification_channel_id: str) -> None:
    """Use the update_notification_channel method

    Args:
        project_id: The Google Cloud project ID.
        notification_channel_id: The server-generated notification channel ID.
    """
    notification_channel = monitoring_v3.NotificationChannel(
        name=f"projects/{project_id}/notificationChannels/{notification_channel_id}",
        display_name="Updated Notification Channel",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_notification_channel(
            notification_channel=notification_channel,
            update_mask=update_mask,
        )
        print(f"Updated notification channel: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update notification channel: {error}")
# [END monitoring_v3_notificationchannelservice_notificationchannel_update]
