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

# [START eventarc_v1_eventarc_channel_create]
import os

import google.api_core.exceptions
from google.cloud import eventarc_v1


def create_channel(channel_id: str) -> None:
    """Creates a channel in Google Cloud Eventarc.

    Args:
        channel_id: Identifier of the channel (for example, 'example-channel-id').
    """
    client = eventarc_v1.EventarcClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project")
    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    channel = eventarc_v1.Channel(
        name=f"{parent}/channels/{channel_id}",
    )

    try:
        operation = client.create_channel(
            parent=parent,
            channel=channel,
            channel_id=channel_id,
        )
        response = operation.result()
        print(f"Created channel: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create channel: {error}")
# [END eventarc_v1_eventarc_channel_create]
