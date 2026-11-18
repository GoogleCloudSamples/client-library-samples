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

# [START dialogflow_v3_environments_deploy_flow]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def deploy_flow(
    project_id: str,
    location_id: str,
    agent_id: str,
    environment_id: str,
    flow_id: str,
    version_id: str,
) -> None:
    """Deploys a flow version to a Dialogflow CX environment.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Dialogflow CX agent is located (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent. Read this from an existing agent.
        environment_id: The server-generated ID of the environment. Read this from an existing environment using ListEnvironments or GetEnvironment.
        flow_id: The server-generated ID of the flow (for example, '00000000-0000-0000-0000-000000000000' for the Default Start Flow). Read this from an existing flow.
        version_id: The server-generated ID of the flow version. Read this from an existing flow version.
    """
    client_options = None
    if location_id != "global":
        client_options = {
            "api_endpoint": f"{location_id}-dialogflow.googleapis.com"
        }
    environments_client = dialogflowcx_v3.EnvironmentsClient(
        client_options=client_options
    )

    environment = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"environments/{environment_id}"
    )
    flow_version = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/versions/{version_id}"
    )

    request = dialogflowcx_v3.DeployFlowRequest(
        environment=environment,
        flow_version=flow_version,
    )

    try:
        # DeployFlow is a long-running operation; wait for it to complete.
        operation = environments_client.deploy_flow(request=request)
        response = operation.result()
        print(f"Flow deployed to environment: {response.environment.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Deployment failed: {e}")


# [END dialogflow_v3_environments_deploy_flow]
