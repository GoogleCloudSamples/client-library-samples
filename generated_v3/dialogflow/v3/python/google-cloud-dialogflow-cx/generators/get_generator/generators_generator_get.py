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

# [START dialogflow_v3_generators_generator_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def get_generator(
    project_id: str, location_id: str, agent_id: str, generator_id: str
) -> None:
    """Retrieves a generator in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the Agent (for example, 'example-agent-id').
        generator_id: The ID of the Generator (for example, 'example-generator-id').
    """
    client_options = {"quota_project_id": project_id}
    if location_id and location_id != "global":
        client_options["api_endpoint"] = f"{location_id}-dialogflow.googleapis.com"

    client = dialogflowcx_v3.GeneratorsClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/generators/{generator_id}"
    request = dialogflowcx_v3.GetGeneratorRequest(name=name)

    try:
        response = client.get_generator(request=request)
        print(f"Retrieved generator: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to get generator: {exc}")
# [END dialogflow_v3_generators_generator_get]
