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

# [START cloudbuild_v1_cloudbuild_builds_list]
import google.api_core.exceptions
from google.cloud.devtools import cloudbuild_v1


def list_builds(project_id: str) -> None:
    """List Cloud Build builds in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    client = cloudbuild_v1.CloudBuildClient()

    request = cloudbuild_v1.ListBuildsRequest(
        project_id=project_id,
        page_size=10,
    )

    try:
        page_result = client.list_builds(request=request)
        for build in page_result:
            print(f"Build ID: {build.id}")
            print(f"Status: {build.status}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list builds: {e}")


# [END cloudbuild_v1_cloudbuild_builds_list]
