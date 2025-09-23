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

# [START monitoring_v3_notificationchannelservice_notificationchannel_delete]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def notification_channel_delete(
    project_id: str, notification_channel_id: str
) -> None:
    """Deletes a Google Cloud Monitoring notification channel.

    Args:
        project_id: Your Google Cloud project ID.
        notification_channel_id: The ID of the notification channel to delete (e.g., 'my-email-channel').
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    notification_channel_name = client.notification_channel_path(
        project_id, notification_channel_id
    )
    try:
        client.delete_notification_channel(name=notification_channel_name, force=True)
        print(f"Deleted {notification_channel_name}")
    except exceptions.NotFound as e:
        print(e)
    except exceptions.FailedPrecondition as e:
        print(e)
    except Exception as e:
        print(e)


# [END monitoring_v3_notificationchannelservice_notificationchannel_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Google Cloud Monitoring notification channel."
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
        help="The ID of the notification channel to delete.",
    )
    args = parser.parse_args()
    notification_channel_delete(
        project_id=args.project_id, notification_channel_id=args.notification_channel_id
    )
