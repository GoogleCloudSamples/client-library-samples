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

# [START cloudasset_v1_assetservice_savedquery_create]
import google.api_core.exceptions
from google.cloud import asset_v1


def create_saved_query(saved_query_id: str, project_id: str) -> None:
    """Creates a saved query in Google Cloud Asset Inventory.

    Args:
        saved_query_id: Unique identifier for the saved query (4-63 characters,
          valid characters: lowercase letters, numbers, and hyphens).
        project_id: The Google Cloud project ID where the saved query is
          created.
    """
    client = asset_v1.AssetServiceClient()

    parent = f"projects/{project_id}"
    resource_selector = asset_v1.IamPolicyAnalysisQuery.ResourceSelector(
        full_resource_name=f"//cloudresourcemanager.googleapis.com/projects/{project_id}"
    )
    analysis_query = asset_v1.IamPolicyAnalysisQuery(
        scope=f"projects/{project_id}",
        resource_selector=resource_selector,
    )
    query_content = asset_v1.SavedQuery.QueryContent(
        iam_policy_analysis_query=analysis_query
    )
    saved_query = asset_v1.SavedQuery(
        description="Analysis query for project IAM policies.",
        content=query_content,
    )

    request = asset_v1.CreateSavedQueryRequest(
        parent=parent,
        saved_query=saved_query,
        saved_query_id=saved_query_id,
    )

    try:
        response = client.create_saved_query(request=request)
        print(f"Created saved query: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create saved query: {error}")
# [END cloudasset_v1_assetservice_savedquery_create]
