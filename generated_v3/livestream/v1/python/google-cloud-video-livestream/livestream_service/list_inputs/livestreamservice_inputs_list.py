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

# [START livestream_v1_livestreamservice_inputs_list]
import google.api_core.exceptions
from google.cloud.video import live_stream_v1


def list_inputs(project_id: str, location_id: str) -> None:
    """Lists livestream inputs in a Google Cloud region.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, "us-central1") where
          Livestream inputs reside.
    """
    client = live_stream_v1.LivestreamServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_inputs(parent=parent)
        for live_input in response:
            print(f"Input name: {live_input.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END livestream_v1_livestreamservice_inputs_list]
