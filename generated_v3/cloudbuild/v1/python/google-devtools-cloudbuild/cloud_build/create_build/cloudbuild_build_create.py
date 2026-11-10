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

# [START cloudbuild_v1_cloudbuild_build_create]
import google.api_core.exceptions
from google.cloud.devtools import cloudbuild_v1


def create_build(project_id: str) -> None:
    """Creates a build in Cloud Build.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = cloudbuild_v1.CloudBuildClient()

    build = cloudbuild_v1.Build(
        steps=[
            cloudbuild_v1.BuildStep(
                name="bash",
                args=["-c", "echo Hello Cloud Build"],
            )
        ]
    )

    try:
        operation = client.create_build(project_id=project_id, build=build)
        response = operation.result()
        print(f"Build created with ID: {response.id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudbuild_v1_cloudbuild_build_create]
