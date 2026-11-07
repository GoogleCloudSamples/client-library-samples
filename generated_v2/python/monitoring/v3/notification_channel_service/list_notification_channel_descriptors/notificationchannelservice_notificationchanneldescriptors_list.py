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

# [START monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.NotificationChannelServiceClient()


def list_notification_channel_descriptors(project_id: str) -> None:
    """Lists notification channel descriptors for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}"

    try:
        descriptors = client.list_notification_channel_descriptors(name=name)
        for descriptor in descriptors:
            print(f"Type: {descriptor.type}")
            print(f"Display Name: {descriptor.display_name}")
            print(f"Description: {descriptor.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list]
