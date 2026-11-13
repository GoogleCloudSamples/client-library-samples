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

# [START monitoring_v3_notificationchannelservice_notificationchannel_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def get_notification_channel(notification_channel_id: str, project_id: str) -> None:
    """Retrieves a notification channel using get_notification_channel.

    Args:
        notification_channel_id: The server-assigned ID of the notification channel.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/notificationChannels/{notification_channel_id}"

    try:
        channel = client.get_notification_channel(name=name)
        print(f"Retrieved notification channel: {channel.name}")
        print(f"Display name: {channel.display_name}")
        print(f"Channel type: {channel.type_}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to retrieve notification channel: {exc}")
# [END monitoring_v3_notificationchannelservice_notificationchannel_get]
