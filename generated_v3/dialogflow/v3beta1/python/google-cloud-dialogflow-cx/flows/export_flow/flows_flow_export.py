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

# [START dialogflow_v3beta1_flows_export_flow]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3beta1


def export_flow(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Exports a Dialogflow CX flow to inline bytes content.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent (for example, a UUID like '11111111-2222-3333-4444-555555555555').
        flow_id: The server-generated ID of the flow (for example, '00000000-0000-0000-0000-000000000000' for default start flow or a flow UUID).
    """
    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/flows/{flow_id}"

    if location_id != "global":
        client = dialogflowcx_v3beta1.FlowsClient(
            client_options={"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        )
    else:
        client = dialogflowcx_v3beta1.FlowsClient()

    request = dialogflowcx_v3beta1.ExportFlowRequest(
        name=name,
        include_referenced_flows=False,
    )

    try:
        operation = client.export_flow(request=request)
        response = operation.result()
        print(f"Exported flow content size: {len(response.flow_content)} bytes")
    except GoogleAPICallError as e:
        print(f"ExportFlow operation failed: {e}")
# [END dialogflow_v3beta1_flows_export_flow]
