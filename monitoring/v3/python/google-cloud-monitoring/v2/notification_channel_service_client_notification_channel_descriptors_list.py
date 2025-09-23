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

# [START monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_notification_channel_descriptors(project_id: str) -> None:
    """Lists notification channel descriptors for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    parent = f"projects/{project_id}"

    try:
        page_result = client.list_notification_channel_descriptors(name=parent)

        for descriptor in page_result:
            print("Notification Channel Descriptor:")
            print(f"  Name: {descriptor.name}")
            print(f"  Type: {descriptor.type}")
            print(f"  Description: {descriptor.description}")
            print(f"  Display Name: {descriptor.display_name}")

    except exceptions.NotFound as e:
        print(f"Error: The project '{project_id}' was not found or you do not have permission to access it. Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists notification channel descriptors for a project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()
    list_notification_channel_descriptors(project_id=args.project_id)
