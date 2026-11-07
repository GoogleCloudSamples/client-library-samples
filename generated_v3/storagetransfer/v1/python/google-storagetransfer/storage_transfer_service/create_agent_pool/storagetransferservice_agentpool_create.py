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

# [START storagetransfer_v1_storagetransferservice_agentpool_create]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def create_agent_pool(project_id: str, agent_pool_id: str) -> None:
    """Creates a Storage Transfer Service agent pool.

    Args:
        project_id: The ID of the Google Cloud project that owns the agent pool (for example, 'example-project-id').
        agent_pool_id: The client-specified ID of the agent pool to create (for example, 'example-agent-pool').
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    agent_pool = storage_transfer_v1.AgentPool(display_name="Sample Agent Pool")

    request = storage_transfer_v1.CreateAgentPoolRequest(
        project_id=project_id,
        agent_pool=agent_pool,
        agent_pool_id=agent_pool_id,
    )

    try:
        response = client.create_agent_pool(request=request)
        print(f"Created agent pool: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Agent pool '{agent_pool_id}' already exists in project '{project_id}'.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create agent pool: {error.message}")
# [END storagetransfer_v1_storagetransferservice_agentpool_create]
