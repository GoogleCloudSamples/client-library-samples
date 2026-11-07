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

# [START dialogflow_v3beta1_pages_pages_list]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def list_pages(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Lists pages in a Dialogflow CX flow.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent.
        flow_id: The ID of the flow to list pages for (for example, '00000000-0000-0000-0000-000000000000' for the Default Start Flow).
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client = dialogflowcx_v3beta1.PagesClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = dialogflowcx_v3beta1.PagesClient()

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/flows/{flow_id}"

    request = dialogflowcx_v3beta1.ListPagesRequest(parent=parent)

    try:
        response = client.list_pages(request=request)
        for page in response:
            print(f"Page name: {page.name}")
            print(f"Display name: {page.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3beta1_pages_pages_list]
