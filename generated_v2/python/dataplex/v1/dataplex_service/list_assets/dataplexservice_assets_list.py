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

# [START dataplex_v1_dataplexservice_assets_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataplexServiceClient()


def list_assets(location_id: str, lake_id: str, zone_id: str, project_id: str) -> None:
    """List Dataplex assets within a specific zone.

    Args:
        location_id: The Google Cloud region where Dataplex resources reside (for example, 'us-central1').
        lake_id: ID of the Lake (for example, 'example-lake-id').
        zone_id: The Dataplex zone identifier.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}"

    request = dataplex_v1.ListAssetsRequest(
        parent=parent,
    )

    try:
        response = client.list_assets(request=request)
        for asset in response:
            print(f"Asset name: {asset.name}")
            print(f"Asset display name: {asset.display_name}")
            print(f"Asset state: {asset.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END dataplex_v1_dataplexservice_assets_list]
