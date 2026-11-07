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

# [START eventarc_v1_eventarc_googlechannelconfig_update]
import google.api_core.exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2

client = eventarc_v1.EventarcClient()


def update_google_channel_config(project_id: str, location_id: str) -> None:
    """Use the update_google_channel_config method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for the channel configuration (e.g., 'us-central1').
    """
    google_channel_config = eventarc_v1.GoogleChannelConfig(
        name=f"projects/{project_id}/locations/{location_id}/googleChannelConfig",
        labels={"env": "test"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        response = client.update_google_channel_config(
            google_channel_config=google_channel_config,
            update_mask=update_mask,
        )
        print(f"Updated Google channel configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update Google channel configuration: {e}")
# [END eventarc_v1_eventarc_googlechannelconfig_update]
