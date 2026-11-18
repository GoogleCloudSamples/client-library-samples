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

# [START dialogflow_v3_agents_agent_create]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def create_agent(project_id: str, location_id: str) -> None:
    """Creates a Dialogflow CX agent in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.AgentsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}"
    agent = dialogflowcx_v3.Agent(
        display_name="example-agent",
        default_language_code="en",
        time_zone="America/New_York",
    )

    try:
        response = client.create_agent(parent=parent, agent=agent)
        print(f"Created agent: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create agent: {error}")
# [END dialogflow_v3_agents_agent_create]
