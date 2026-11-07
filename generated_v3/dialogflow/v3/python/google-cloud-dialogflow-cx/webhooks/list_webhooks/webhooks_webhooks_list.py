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

# [START dialogflow_v3_webhooks_webhooks_list]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def list_webhooks(project_id: str, location_id: str, agent_id: str) -> None:
    """Lists webhooks associated with a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent is located (for example, 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent (for example, 'b8301423-e653-4993-916d-3c0847713875').
    """
    client_options = None
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client_options = {"api_endpoint": api_endpoint}

    client = dialogflowcx_v3.WebhooksClient(client_options=client_options)

    # Construct the parent agent resource path.
    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    request = dialogflowcx_v3.ListWebhooksRequest(parent=parent)

    try:
        response = client.list_webhooks(request=request)
        for webhook in response:
            print(f"Webhook name: {webhook.name}")
            print(f"Display name: {webhook.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3_webhooks_webhooks_list]
