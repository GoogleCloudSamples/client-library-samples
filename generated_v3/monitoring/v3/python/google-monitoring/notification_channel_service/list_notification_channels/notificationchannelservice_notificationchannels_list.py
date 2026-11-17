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

# [START monitoring_v3_notificationchannelservice_notificationchannels_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def list_notification_channels(project_id: str) -> None:
    """Use the list_notification_channels method

    Args:
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}"

    try:
        response = client.list_notification_channels(name=name)
        for channel in response:
            print(f"Channel Name: {channel.name}")
            print(f"Display Name: {channel.display_name}")
            print(f"Type: {channel.type_}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list notification channels: {error}")
# [END monitoring_v3_notificationchannelservice_notificationchannels_list]
