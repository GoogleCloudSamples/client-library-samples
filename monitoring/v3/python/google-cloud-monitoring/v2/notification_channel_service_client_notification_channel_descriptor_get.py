# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_notification_channel_descriptor(project_id: str, channel_type: str) -> None:
    """Get a notification channel descriptor.

    Args:
        project_id: Your Google Cloud project ID.
        channel_type: The type of the notification channel descriptor to retrieve (e.g., 'email', 'sms', 'pagerduty').
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    name = client.notification_channel_descriptor_path(project_id, channel_type)
    try:
        request = monitoring_v3.GetNotificationChannelDescriptorRequest(name=name)
        descriptor = client.get_notification_channel_descriptor(request=request)
        print("Notification Channel Descriptor:")
        print(f"  Name: {descriptor.name}")
        print(f"  Display Name: {descriptor.display_name}")
        print(f"  Type: {descriptor.type}")
        print(f"  Description: {descriptor.description}")
        if descriptor.labels:
            print("  Labels:")
            for label in descriptor.labels:
                print(
                    f"    - Key: {label.key}, Value Type: {label.value_type}, Description: {label.description}"
                )

    except exceptions.NotFound as e:
        print(f"Error: Notification channel descriptor '{channel_type}' not found for project '{project_id}'. Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get a notification channel descriptor."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--channel_type",
        type=str,
        required=True,
        help="The type of the notification channel descriptor to retrieve.",
    )
    args = parser.parse_args()
    get_notification_channel_descriptor(
        project_id=args.project_id, channel_type=args.channel_type
    )
