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

# [START monitoring_v3_notificationchannelservice_send_notification_channel_verification_code]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def send_notification_channel_verification_code(
    project_id: str, notification_channel_id: str
) -> None:
    """Sends a verification code to a notification channel.

    Args:
        project_id: The Google Cloud project ID.
        notification_channel_id: The server-generated ID of the notification
          channel to verify.
    """
    name = f"projects/{project_id}/notificationChannels/{notification_channel_id}"

    try:
        client.send_notification_channel_verification_code(name=name)
        print(f"Sent verification code to notification channel: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to send verification code: {error}")


# [END monitoring_v3_notificationchannelservice_send_notification_channel_verification_code]
