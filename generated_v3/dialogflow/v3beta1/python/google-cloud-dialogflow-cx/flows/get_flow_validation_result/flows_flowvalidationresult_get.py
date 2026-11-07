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

# [START dialogflow_v3beta1_flows_flowvalidationresult_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def get_flow_validation_result(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Retrieves the validation result for a specified Dialogflow flow.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        flow_id: ID of the Flow (for example, 'example-flow-id').
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
    else:
        api_endpoint = "dialogflow.googleapis.com"

    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )
    client = dialogflowcx_v3beta1.FlowsClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/validationResult"
    )

    request = dialogflowcx_v3beta1.GetFlowValidationResultRequest(name=name)

    try:
        response = client.get_flow_validation_result(request=request)
        print(f"Retrieved flow validation result: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve flow validation result: {e}")
# [END dialogflow_v3beta1_flows_flowvalidationresult_get]
