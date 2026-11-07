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

# [START eventarc_v1_eventarc_channel_delete]
import google.api_core.exceptions
from google.cloud import eventarc_v1

client = eventarc_v1.EventarcClient()


def delete_channel(project_id: str, location_id: str, channel_id: str) -> None:
    """Use the delete_channel method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Eventarc channel is located.
        channel_id: The caller-chosen ID of the existing Channel to delete.
    """
    name = client.channel_path(project_id, location_id, channel_id)

    try:
        # DeleteChannel initiates a long-running operation
        operation = client.delete_channel(name=name)
        operation.result()
        print(f"Deleted channel: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Channel not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed with error: {error}")
# [END eventarc_v1_eventarc_channel_delete]
