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

# [START dialogflow_v3_flows_export_flow]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def export_flow(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Exports the specified flow to a binary representation.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        agent_id: ID of the Agent (for example, 'example-agent-id')
        flow_id: ID of the Flow (for example, 'example-flow-id')
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.FlowsClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/flows/{flow_id}"

    request = dialogflowcx_v3.ExportFlowRequest(
        name=name,
        include_referenced_flows=False,
    )

    try:
        operation = client.export_flow(request=request)
        response = operation.result()
        print(f"Exported flow: {name}")
        if response.flow_content:
            print(f"Flow content length: {len(response.flow_content)} bytes")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to export flow: {error}")
# [END dialogflow_v3_flows_export_flow]
