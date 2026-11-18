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

# [START dialogflow_v3_agents_generativesettings_get]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3


def get_generative_settings(
    project_id: str, location_id: str, agent_id: str, language_code: str
) -> None:
    """Retrieves the generative settings for a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Dialogflow CX agent is located (for example, 'us-central1' or 'global').
        agent_id: The server-generated ID of the Dialogflow CX agent (for example, 'example-agent-id').
        language_code: The BCP 47 language code of the generative settings (for example, 'en').
    """
    client_options = None
    if location_id and location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-dialogflow.googleapis.com"
        )

    client = dialogflowcx_v3.AgentsClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/generativeSettings"

    request = dialogflowcx_v3.GetGenerativeSettingsRequest(
        name=name,
        language_code=language_code,
    )

    try:
        response = client.get_generative_settings(request=request)
        print(f"Retrieved generative settings: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve generative settings: {e}")
# [END dialogflow_v3_agents_generativesettings_get]
