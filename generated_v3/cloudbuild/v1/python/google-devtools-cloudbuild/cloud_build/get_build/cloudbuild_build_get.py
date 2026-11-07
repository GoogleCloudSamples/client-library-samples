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

# [START cloudbuild_v1_cloudbuild_build_get]
from google.api_core import exceptions
from google.cloud.devtools import cloudbuild_v1


def get_build(project_id: str, id: str) -> None:
    """Retrieves build details for the specified build identifier.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        id: The unique identifier of the build (for example, 'example-build-id').
    """
    client = cloudbuild_v1.CloudBuildClient()

    request = cloudbuild_v1.GetBuildRequest(
        project_id=project_id,
        id=id,
    )

    try:
        response = client.get_build(request=request)
        print(f"Build ID: {response.id}")
        print(f"Status: {response.status}")
        print(f"Create Time: {response.create_time}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve build: {error}")
# [END cloudbuild_v1_cloudbuild_build_get]
