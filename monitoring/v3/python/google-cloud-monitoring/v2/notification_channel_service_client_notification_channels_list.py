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

# [START monitoring_v3_notificationchannelservice_notificationchannels_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_notification_channels(project_id: str) -> None:
    """Lists notification channels for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    project_name = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListNotificationChannelsRequest(name=project_name)

        page_result = client.list_notification_channels(request=request)

        found_channels = False
        for channel in page_result:
            found_channels = True
            print("Notification Channel:")
            print(f"  Description: {channel.description}")
            print(f"  Display Name: {channel.display_name}")
            print(f"  Name: {channel.name}")
            print(f"  Type: {channel.type}")
            print(f"  Verification Status: {channel.verification_status.name}")

        if not found_channels:
            print("No notification channels found for this project.")

    except exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' not found or you do not have permissions "
            f"to access it. Please ensure the project ID is correct and you are "
            f"authenticated with appropriate permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred while listing notification channels: {e}")


# [END monitoring_v3_notificationchannelservice_notificationchannels_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists notification channels for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()
    list_notification_channels(project_id=args.project_id)
