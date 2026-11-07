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

# [START dialogflow_v3beta1_environments_deploy_flow]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def deploy_flow(
    project_id: str,
    location_id: str,
    agent_id: str,
    environment_id: str,
    flow_id: str,
    version_id: str,
) -> None:
    """Deploys a flow version to the specified environment.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        environment_id: ID of the Environment (for example, 'example-environment-id').
        flow_id: ID of the Flow (for example, 'example-flow-id').
        version_id: ID of the Version (for example, 'example-version-id').
    """
    client_options = ClientOptions(quota_project_id=project_id)
    if location_id and location_id != "global":
        client_options.api_endpoint = f"{location_id}-dialogflow.googleapis.com"

    client = dialogflowcx_v3beta1.EnvironmentsClient(client_options=client_options)

    environment = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"environments/{environment_id}"
    )
    flow_version = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/versions/{version_id}"
    )

    request = dialogflowcx_v3beta1.DeployFlowRequest(
        environment=environment,
        flow_version=flow_version,
    )

    try:
        operation = client.deploy_flow(request=request)
        response = operation.result()
        print(f"Flow deployed to environment: {response.environment.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"DeployFlow failed with error: {e}")
# [END dialogflow_v3beta1_environments_deploy_flow]
