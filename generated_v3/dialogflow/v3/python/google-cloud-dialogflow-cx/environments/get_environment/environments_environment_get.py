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

# [START dialogflow_v3_environments_environment_get]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def get_environment(
    project_id: str, location_id: str, agent_id: str, environment_id: str
) -> None:
    """Retrieves the specified Dialogflow CX environment.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region or location where the Dialogflow CX
          resources are located (for example, 'global' or 'us-central1').
        agent_id: The server-generated unique identifier of the Dialogflow CX
          Agent (for example, '123e4567-e89b-12d3-a456-426614174000').
        environment_id: The server-generated unique identifier of the Dialogflow
          CX Environment (for example, '123e4567-e89b-12d3-a456-426614174000').
    """
    client = dialogflowcx_v3.EnvironmentsClient()

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/agents/{agent_id}/environments/{environment_id}"
    )

    request = dialogflowcx_v3.GetEnvironmentRequest(name=name)

    try:
        response = client.get_environment(request=request)
        print(f"Environment name: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to get environment: {error}")


# [END dialogflow_v3_environments_environment_get]
