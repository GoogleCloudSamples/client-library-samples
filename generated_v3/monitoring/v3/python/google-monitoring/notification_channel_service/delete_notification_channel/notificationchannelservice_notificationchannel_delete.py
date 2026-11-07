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

# [START monitoring_v3_notificationchannelservice_notificationchannel_delete]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def delete_notification_channel(notification_channel_id: str, project_id: str) -> None:
    """Deletes a notification channel in Cloud Monitoring.

    Args:
        notification_channel_id: The server-assigned ID of the notification channel to delete.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/notificationChannels/{notification_channel_id}"

    try:
        # Cascade deletion can be enabled with force=True if needed
        client.delete_notification_channel(name=name)
        print(f"Deleted notification channel: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Notification channel not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END monitoring_v3_notificationchannelservice_notificationchannel_delete]
