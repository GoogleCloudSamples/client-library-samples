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

# [START monitoring_v3_notificationchannelservice_notificationchannel_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2, wrappers_pb2


def update_notification_channel(project_id: str, notification_channel_id: str) -> None:
    """Updates an existing Google Cloud Monitoring notification channel.

    Args:
        project_id: The Google Cloud project ID.
        notification_channel_id: The ID of the notification channel to update.
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    channel_name = client.notification_channel_path(project_id, notification_channel_id)
    updated_channel = monitoring_v3.NotificationChannel(
        name=channel_name,
        display_name="Updated Email Channel",
        description="This is an updated email channel for critical alerts.",
        enabled=wrappers_pb2.BoolValue(value=False),
    )
    update_mask = field_mask_pb2.FieldMask(
        paths=["display_name", "description", "enabled"]
    )

    try:
        response = client.update_notification_channel(
            notification_channel=updated_channel,
            update_mask=update_mask,
        )
        print("Notification Channel:")
        print(f"  Description: {response.description}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Enabled: {response.enabled}")
        print(f"  Name: {response.name}")
        print(f"  Type: {response.type}")
        print(f"  Verification Status: {response.verification_status.name}")

    except exceptions.NotFound:
        print(
            f"Error: Notification channel '{channel_name}' not found. "
            "Please ensure the project ID and channel ID are correct and the channel exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(
            f"An API error occurred while updating notification channel '{channel_name}': {e} "
            "Please check the error message for details. Common causes include "
            "invalid channel data, insufficient permissions, or API rate limits."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_notificationchannelservice_notificationchannel_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Google Cloud Monitoring notification channel."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--notification_channel_id",
        type=str,
        required=True,
        help="The ID of the notification channel to update.",
    )
    args = parser.parse_args()
    update_notification_channel(
        project_id=args.project_id, notification_channel_id=args.notification_channel_id
    )
