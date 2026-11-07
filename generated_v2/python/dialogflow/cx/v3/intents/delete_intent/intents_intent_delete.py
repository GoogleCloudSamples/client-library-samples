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

# [START dialogflow_v3_intents_intent_delete]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def delete_intent(
    project_id: str, location_id: str, agent_id: str, intent_id: str
) -> None:
    """Deletes a specified intent from a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud region where the Dialogflow CX agent is
            located (for example, 'us-central1' or 'global').
        agent_id: The server-generated ID of the Dialogflow CX agent. Obtain
            this from an existing agent.
        intent_id: The server-generated ID of the intent to delete. Retrieve
            this from an existing intent; do not use aliases.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.IntentsClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/intents/{intent_id}"

    request = dialogflowcx_v3.DeleteIntentRequest(
        name=name,
    )

    try:
        client.delete_intent(request=request)
        print(f"Deleted intent: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete intent: {error}")
# [END dialogflow_v3_intents_intent_delete]
