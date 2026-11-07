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

# [START cloudasset_v1_assetservice_allresources_search]
from google.api_core import exceptions
from google.cloud import asset_v1


def search_all_resources(project_id: str) -> None:
    """Searches all Cloud resources within a specified project scope.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = asset_v1.AssetServiceClient(
        client_options={"quota_project_id": project_id}
    )
    scope = f"projects/{project_id}"

    request = asset_v1.SearchAllResourcesRequest(
        scope=scope,
        query="state:ACTIVE",
    )

    try:
        response = client.search_all_resources(request=request)
        for resource in response:
            print(f"Resource name: {resource.name}")
            print(f"Asset type: {resource.asset_type}")
            print(f"Display name: {resource.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Search failed with error: {error}")
# [END cloudasset_v1_assetservice_allresources_search]
