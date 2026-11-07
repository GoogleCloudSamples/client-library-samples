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

# [START dialogflow_v3_intents_import_intents]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def import_intents(
    project_id: str, location_id: str, agent_id: str, intents_uri: str
) -> None:
    """Imports intents into a Dialogflow CX agent from Google Cloud Storage.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The server-generated ID of the agent (for example, 'example-agent-id').
        intents_uri: The Google Cloud Storage URI to import intents from (for example, 'gs://example-bucket/intents.json').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.IntentsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    request = dialogflowcx_v3.ImportIntentsRequest(
        parent=parent,
        intents_uri=intents_uri,
    )

    try:
        operation = client.import_intents(request=request)
        response = operation.result()
        print(
            f"Operation completed successfully with {len(response.intents)} intents imported."
        )
        for intent in response.intents:
            print(f"Imported intent: {intent}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_intents_import_intents]
