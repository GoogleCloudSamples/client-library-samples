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

# [START retail_v2alpha_projectservice_project_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import retail_v2alpha


def get_project(project_number_or_id: str) -> None:
    """Retrieves project metadata.

    Args:
        project_number_or_id: Google Cloud project number or identifier (for
            example, 'example-project-id').
    """
    client_options = ClientOptions(quota_project_id=project_number_or_id)
    client = retail_v2alpha.ProjectServiceClient(client_options=client_options)

    name = f"projects/{project_number_or_id}/retailProject"

    request = retail_v2alpha.GetProjectRequest(name=name)

    try:
        response = client.get_project(request=request)
        print(f"Project name: {response.name}")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied: {error.message}")
    except google.api_core.exceptions.NotFound as error:
        print(f"Project not found: {error.message}")
# [END retail_v2alpha_projectservice_project_get]
