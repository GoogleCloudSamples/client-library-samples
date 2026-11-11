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

# [START dataplex_v1_dataplexservice_lakeactions_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1


def list_lake_actions(location_id: str, lake_id: str, project_id: str) -> None:
    """Lists actions for a Dataplex lake.

    Args:
        location_id: The Google Cloud region where the lake is located (for
          example, 'us-central1').
        lake_id: The identifier of the Dataplex lake.
        project_id: The Google Cloud project ID.
    """
    client = dataplex_v1.DataplexServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}"

    request = dataplex_v1.ListLakeActionsRequest(
        parent=parent,
    )

    try:
        pager = client.list_lake_actions(request=request)
        action_found = False
        for action in pager:
            action_found = True
            print(f"Action: {action.name}")
            print(f"Category: {action.category.name}")
            print(f"Issue: {action.issue}")
        if not action_found:
            print("No actions found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END dataplex_v1_dataplexservice_lakeactions_list]
