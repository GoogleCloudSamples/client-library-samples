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

# [START cloudasset_v1_assetservice_savedqueries_list]
from google.api_core import exceptions
from google.cloud import asset_v1


def list_saved_queries(project_id: str) -> None:
    """Lists saved queries in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to list saved queries from.
    """
    client = asset_v1.AssetServiceClient()
    parent = f"projects/{project_id}"

    try:
        response = client.list_saved_queries(
            request=asset_v1.ListSavedQueriesRequest(parent=parent)
        )
        for saved_query in response:
            print(f"Name: {saved_query.name}")
            print(f"Description: {saved_query.description}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list saved queries: {error}")
# [END cloudasset_v1_assetservice_savedqueries_list]
