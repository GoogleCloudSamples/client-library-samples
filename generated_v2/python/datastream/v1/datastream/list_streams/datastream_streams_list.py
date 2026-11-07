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

# [START datastream_v1_datastream_streams_list]
import google.api_core.exceptions
from google.cloud import datastream_v1

client = datastream_v1.DatastreamClient()


def list_streams(project_id: str, location_id: str) -> None:
    """Lists Datastream streams in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, "us-central1").
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = datastream_v1.ListStreamsRequest(
        parent=parent,
    )

    try:
        response = client.list_streams(request=request)
        for stream in response:
            print(f"Stream name: {stream.name}")
            print(f"Display name: {stream.display_name}")
            print(f"State: {stream.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list streams: {e}")
# [END datastream_v1_datastream_streams_list]
