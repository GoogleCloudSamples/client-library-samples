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

# [START eventarc_v1_eventarc_channelconnections_list]
import google.api_core.exceptions
from google.cloud import eventarc_v1


def list_channel_connections(project_id: str, location_id: str) -> None:
    """Lists Eventarc channel connections in a specified location.

    Args:
        project_id: The Google Cloud project ID where channel connections reside.
        location_id: The Google Cloud region where the channel connections are hosted (for example, 'us-central1').
    """
    client = eventarc_v1.EventarcClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = eventarc_v1.ListChannelConnectionsRequest(parent=parent)
        response = client.list_channel_connections(request=request)

        count = 0
        for channel_connection in response:
            count += 1
            print(f"Channel connection: {channel_connection.name}")
            print(f"Channel: {channel_connection.channel}")
            print(f"Activation token: {channel_connection.activation_token}")

        if count == 0:
            print(f"No channel connections found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list channel connections: {e}")
# [END eventarc_v1_eventarc_channelconnections_list]
