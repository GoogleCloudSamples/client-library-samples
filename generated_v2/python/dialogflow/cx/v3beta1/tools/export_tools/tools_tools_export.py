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

# [START dialogflow_v3beta1_tools_export_tools]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def export_tools(
    project_id: str, location_id: str, agent_id: str, tool_id: str
) -> None:
    """Exports tools from an agent to inline content.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        tool_id: ID of the Tool (for example, 'example-tool-id').
    """
    api_endpoint = (
        f"{location_id}-dialogflow.googleapis.com"
        if location_id != "global"
        else None
    )
    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )

    client = dialogflowcx_v3beta1.ToolsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
    tools = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/tools/{tool_id}"
    )

    request = dialogflowcx_v3beta1.ExportToolsRequest(
        parent=parent,
        tools=[tools],
        tools_content_inline=True,
    )

    try:
        operation = client.export_tools(request=request)
        response = operation.result()
        print(f"Exported tools: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Export tools failed: {e}")
# [END dialogflow_v3beta1_tools_export_tools]
