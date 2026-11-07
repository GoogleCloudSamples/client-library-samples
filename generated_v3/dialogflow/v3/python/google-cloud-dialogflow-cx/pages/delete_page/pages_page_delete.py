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

# [START dialogflow_v3_pages_page_delete]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def delete_page(
    project_id: str,
    location_id: str,
    agent_id: str,
    flow_id: str,
    page_id: str,
) -> None:
    """Deletes a specified page in a Dialogflow CX flow.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        flow_id: ID of the Flow (for example, 'example-flow-id').
        page_id: ID of the Page (for example, 'example-page-id').
    """
    client_options = {"quota_project_id": project_id}
    if location_id != "global":
        client_options["api_endpoint"] = f"{location_id}-dialogflow.googleapis.com"

    client = dialogflowcx_v3.PagesClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/agents/{agent_id}/flows/{flow_id}/pages/{page_id}"
    )

    request = dialogflowcx_v3.DeletePageRequest(
        name=name,
    )

    try:
        client.delete_page(request=request)
        print(f"Deleted page: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END dialogflow_v3_pages_page_delete]
