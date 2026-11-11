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

# [START eventarc_v1_eventarc_channel_get]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def get_channel(project_id: str, location_id: str, channel_id: str) -> None:
    """Retrieve an Eventarc channel.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the channel is located.
        channel_id: The user-specified ID of the Eventarc channel to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/channels/{channel_id}"

    try:
        request = eventarc_v1.GetChannelRequest(name=name)
        channel = client.get_channel(request=request)
        print(f"Retrieved channel: {channel.name}")
        print(f"Channel state: {channel.state}")
    except google.api_core.exceptions.NotFound:
        print(f"Channel not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call error occurred: {error}")
# [END eventarc_v1_eventarc_channel_get]
