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

# [START monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def get_notification_channel_descriptor(
    project_id: str, notification_channel_descriptor_id: str
) -> None:
    """Retrieve a notification channel descriptor from Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
        notification_channel_descriptor_id: The notification channel descriptor
          identifier or type (for example, 'email', 'sms').
    """
    name = (
        f"projects/{project_id}/notificationChannelDescriptors/"
        f"{notification_channel_descriptor_id}"
    )

    try:
        descriptor = client.get_notification_channel_descriptor(name=name)
        print(f"Descriptor Name: {descriptor.name}")
        print(f"Type: {descriptor.type_}")
        print(f"Display Name: {descriptor.display_name}")
        print(f"Description: {descriptor.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
