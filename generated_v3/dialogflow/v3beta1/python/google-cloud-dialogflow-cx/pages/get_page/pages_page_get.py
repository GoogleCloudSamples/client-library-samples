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

# [START dialogflow_v3beta1_pages_page_get]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3beta1


def get_page(
    project_id: str, location_id: str, agent_id: str, flow_id: str, page_id: str
) -> None:
    """Retrieves a specific page from a Dialogflow CX flow.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where the Dialogflow CX agent resides (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent.
        flow_id: The server-generated ID of the flow.
        page_id: The server-generated ID of the page, or 'START_PAGE'.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.PagesClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/pages/{page_id}"
    )

    request = dialogflowcx_v3beta1.GetPageRequest(name=name)

    try:
        response = client.get_page(request=request)
        print(f"Page name: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve page: {error}")


# [END dialogflow_v3beta1_pages_page_get]
