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

# [START discoveryengine_v1alpha_projectservice_project_get]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.ProjectServiceClient()


def get_project(project_id: str) -> None:
    """Use the get_project method

    Args:
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}"

    request = discoveryengine_v1alpha.GetProjectRequest(
        name=name,
    )

    try:
        response = client.get_project(request=request)
        print(f"Project resource name: {response.name}")
        print(f"Provision completion time: {response.provision_completion_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error.message}")
# [END discoveryengine_v1alpha_projectservice_project_get]
