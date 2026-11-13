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

# [START dialogflow_v3beta1_webhooks_webhook_delete]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def delete_webhook(
    project_id: str, location_id: str, agent_id: str, webhook_id: str
) -> None:
    """Deletes the specified webhook from a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or location of the Dialogflow CX agent (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent (for example, '12345678-1234-1234-1234-1234567890ab').
        webhook_id: The server-generated ID of the webhook to delete (for example, '12345678-1234-1234-1234-1234567890ab').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.WebhooksClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/webhooks/{webhook_id}"

    try:
        client.delete_webhook(name=name)
        print(f"Deleted webhook: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete webhook: {exc}")
# [END dialogflow_v3beta1_webhooks_webhook_delete]
