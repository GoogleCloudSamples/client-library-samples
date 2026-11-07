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

# [START cloudresourcemanager_v3_projects_project_get]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def get_project(project_id: str) -> None:
    """Retrieve metadata for a Google Cloud project.

    Args:
        project_id: The unique identifier or project number of the Google Cloud
            project to retrieve.
    """
    client = resourcemanager_v3.ProjectsClient()

    name = f"projects/{project_id}"

    try:
        project = client.get_project(name=name)
        print(f"Project display name: {project.display_name}")
        print(f"Project ID: {project.project_id}")
        print(f"Project state: {project.state.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Project not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudresourcemanager_v3_projects_project_get]
