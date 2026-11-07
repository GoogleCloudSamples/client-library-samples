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

# [START cloudresourcemanager_v3_projects_projects_search]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def search_projects(query: str) -> None:
    """Search for projects matching a specified query filter.

    Args:
        query: A query string for searching projects (for example, 'state:ACTIVE').
    """
    client = resourcemanager_v3.ProjectsClient()
    request = resourcemanager_v3.SearchProjectsRequest(query=query)

    try:
        page_result = client.search_projects(request=request)
        for project in page_result:
            print(f"Project ID: {project.project_id}")
            print(f"Display Name: {project.display_name}")
            print(f"State: {project.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Project search failed: {e}")
# [END cloudresourcemanager_v3_projects_projects_search]
