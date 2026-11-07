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

# [START dialogflow_v3_intents_export_intents]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def export_intents(
    project_id: str, location_id: str, agent_id: str, intent_id: str
) -> None:
    """Exports intents from a Dialogflow CX agent inline.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dialogflow CX agent is located.
        agent_id: The ID of the Dialogflow CX agent.
        intent_id: The ID of the intent to export.
    """
    client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
    client = dialogflowcx_v3.IntentsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
    intents = [
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/intents/{intent_id}"
    ]
    intents_content_inline = True

    request = dialogflowcx_v3.ExportIntentsRequest(
        parent=parent,
        intents=intents,
        intents_content_inline=intents_content_inline,
    )

    try:
        operation = client.export_intents(request=request)
        response = operation.result()
        print(f"Export completed: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Export intents request failed: {e}")
# [END dialogflow_v3_intents_export_intents]
