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

# [START notebooks_v1beta1_notebookservice_environment_create]
import google.api_core.exceptions
from google.cloud import notebooks_v1beta1

client = notebooks_v1beta1.NotebookServiceClient()


def create_environment(
    environment_id: str, project_id: str, location_id: str
) -> None:
    """Creates a Notebooks environment.

    Args:
        environment_id: ID of the Environment (for example, 'example-environment-id').
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    environment = notebooks_v1beta1.Environment(
        display_name="Example Environment",
        description="Environment configured with a container image",
        container_image=notebooks_v1beta1.ContainerImage(
            repository="gcr.io/deeplearning-platform-release/base-cpu",
        ),
    )

    request = notebooks_v1beta1.CreateEnvironmentRequest(
        parent=parent,
        environment_id=environment_id,
        environment=environment,
    )

    try:
        operation = client.create_environment(request=request)
        response = operation.result()
        print(f"Environment created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END notebooks_v1beta1_notebookservice_environment_create]
