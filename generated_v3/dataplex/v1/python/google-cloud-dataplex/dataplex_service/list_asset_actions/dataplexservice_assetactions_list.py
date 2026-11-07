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

# [START dataplex_v1_dataplexservice_assetactions_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def list_asset_actions(
    location_id: str,
    lake_id: str,
    zone_id: str,
    asset_id: str,
    project_id: str,
) -> None:
    """Lists actions for a Dataplex asset.

    Args:
        location_id: The Google Cloud region where the lake and asset reside
            (for example, 'us-central1').
        lake_id: The identifier of the Dataplex lake.
        zone_id: The identifier of the Dataplex zone.
        asset_id: The identifier of the Dataplex asset.
        project_id: The Google Cloud project ID.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}"
    )

    request = dataplex_v1.ListAssetActionsRequest(parent=parent)

    try:
        response = client.list_asset_actions(request=request)
        action_found = False
        for action in response:
            print(f"Action name: {action.name}")
            print(f"Action issue: {action.issue}")
            action_found = True

        if not action_found:
            print(f"No actions found for asset: {asset_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list asset actions: {error}")
# [END dataplex_v1_dataplexservice_assetactions_list]
