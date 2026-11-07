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

# [START eventarc_v1_eventarc_channels_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def list_channels(project_id: str, location_id: str) -> None:
    """Lists Eventarc channels in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location, for example, 'us-central1'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = eventarc_v1.ListChannelsRequest(parent=parent)
        response = client.list_channels(request=request)

        for channel in response:
            print(f"Channel: {channel.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END eventarc_v1_eventarc_channels_list]
