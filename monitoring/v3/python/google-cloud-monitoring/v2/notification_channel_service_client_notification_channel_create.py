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

# [START monitoring_v3_notificationchannelservice_notificationchannel_create]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_notification_channel(
    project_id: str,
) -> None:
    """Creates a new Google Cloud Monitoring notification channel.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.NotificationChannelServiceClient()
    parent = f"projects/{project_id}"
    channel_type = "email"

    # The labels required depend on the channel_type. For this sample, we
    # hardcode example labels for 'email', 'sms', and 'pagerduty' types.
    # For other types, you would need different labels. You can list available
    # channel descriptors and their required labels using
    # client.list_notification_channel_descriptors().
    labels = {}
    if channel_type == "email":
        labels = {"email_address": "your-email@example.com"}
    elif channel_type == "sms":
        labels = {"phone_number": "+15551234567"}
    elif channel_type == "pagerduty":
        labels = {"service_key": "your-pagerduty-integration-key"}
    else:
        print(
            f"Warning: Channel type '{channel_type}' is not explicitly handled in this sample's labels. "
            "Please ensure you provide the correct labels for this type."
        )
        # For demonstration purposes, we'll proceed with empty labels if not email/sms/pagerduty.
        # In a real application, you would need to dynamically determine or require specific labels.

    notification_channel = monitoring_v3.NotificationChannel(
        type=channel_type,
        display_name=f"My {channel_type.capitalize()} Channel",
        description=f"This is an example {channel_type} notification channel created by a sample.",
        labels=labels,
    )

    try:
        response = client.create_notification_channel(
            name=parent, notification_channel=notification_channel
        )
        print(f"Successfully created notification channel: {response.name}")
        print(f"    Display Name: {response.display_name}")
        print(f"    Labels: {response.labels}")
        print(f"    Type: {response.type}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: Notification channel of type '{channel_type}' with these properties already exists."
        )
        print(f"Details: {e}")
        print(
            "Suggestion: Try updating the existing channel or creating one with different properties."
        )
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for creating notification channel.")
        print(f"Details: {e}")
        print(
            "Suggestion: Ensure the channel type is valid and all required labels are correctly specified."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_notificationchannelservice_notificationchannel_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new Google Cloud Monitoring notification channel."
    )
    parser.add_argument(
        "--project_id", help="The Google Cloud project ID.", required=True
    )
    args = parser.parse_args()
    create_notification_channel(project_id=args.project_id)
