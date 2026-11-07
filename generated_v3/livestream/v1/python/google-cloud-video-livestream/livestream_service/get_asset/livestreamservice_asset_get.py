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

# [START livestream_v1_livestreamservice_asset_get]
from google.api_core import exceptions
from google.cloud.video import live_stream_v1


def get_asset(project_id: str, location_id: str, asset_id: str) -> None:
    """Gets a livestream asset.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        asset_id: The ID of the asset (for example, 'example-asset-id').
    """
    client = live_stream_v1.LivestreamServiceClient()

    name = client.asset_path(project_id, location_id, asset_id)

    try:
        response = client.get_asset(name=name)
        print(f"Asset name: {response.name}")
        print(f"Asset state: {response.state.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to get asset: {error}")
# [END livestream_v1_livestreamservice_asset_get]
