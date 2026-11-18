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

# [START dialogflow_v3beta1_intents_intent_get]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3beta1


def get_intent(
    project_id: str, location_id: str, agent_id: str, intent_id: str
) -> None:
    """Retrieves the specified intent from a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        intent_id: ID of the Intent (for example, 'example-intent-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/intents/{intent_id}"

    client_options = None
    if location_id != "global":
        client_options = {
            "api_endpoint": f"{location_id}-dialogflow.googleapis.com"
        }

    client = dialogflowcx_v3beta1.IntentsClient(client_options=client_options)

    request = dialogflowcx_v3beta1.GetIntentRequest(
        name=name,
    )

    try:
        response = client.get_intent(request=request)
        print(f"Retrieved Intent Display Name: {response.display_name}")
        print(f"Intent Resource Name: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve intent: {error}")
# [END dialogflow_v3beta1_intents_intent_get]
