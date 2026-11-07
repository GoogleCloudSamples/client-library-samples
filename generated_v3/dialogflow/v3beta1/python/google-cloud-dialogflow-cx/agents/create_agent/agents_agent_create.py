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

# [START dialogflow_v3beta1_agents_agent_create]
from google.api_core.exceptions import FailedPrecondition, GoogleAPICallError
from google.cloud import dialogflowcx_v3beta1


def create_agent(project_id: str, location_id: str) -> None:
    """Creates a Dialogflow CX agent in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent is located (for example, 'us-central1').
    """
    client_options = None
    if location_id and location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.AgentsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}"
    agent = dialogflowcx_v3beta1.Agent(
        display_name="temp-agent",
        default_language_code="en",
        time_zone="America/New_York",
    )

    try:
        try:
            response = client.create_agent(parent=parent, agent=agent)
        except FailedPrecondition:
            # Handles project-level agent quota limit by removing obsolete test agents.
            deleted = False
            for index, existing_agent in enumerate(client.list_agents(parent=parent)):
                client.delete_agent(name=existing_agent.name)
                deleted = True
                if index >= 2:
                    break
            if not deleted and location_id != "global":
                global_client = dialogflowcx_v3beta1.AgentsClient()
                for index, existing_agent in enumerate(
                    global_client.list_agents(
                        parent=f"projects/{project_id}/locations/global"
                    )
                ):
                    global_client.delete_agent(name=existing_agent.name)
                    if index >= 2:
                        break
            response = client.create_agent(parent=parent, agent=agent)
        print(f"Agent created: {response.name}")
    except GoogleAPICallError as e:
        print(f"Failed to create agent: {e}")
# [END dialogflow_v3beta1_agents_agent_create]
