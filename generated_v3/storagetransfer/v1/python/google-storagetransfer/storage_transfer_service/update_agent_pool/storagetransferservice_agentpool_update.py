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

# [START storagetransfer_v1_storagetransferservice_agentpool_update]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1
from google.protobuf import field_mask_pb2


def update_agent_pool(project_id: str, agent_pool_id: str) -> None:
    """Updates an agent pool display name using the update_agent_pool method.

    Args:
        project_id: The ID of the Google Cloud project that owns the agent pool.
        agent_pool_id: The ID of the agent pool to update.
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    agent_pool = storage_transfer_v1.AgentPool(
        name=f"projects/{project_id}/agentPools/{agent_pool_id}",
        display_name="Updated Sample Agent Pool",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = storage_transfer_v1.UpdateAgentPoolRequest(
        agent_pool=agent_pool,
        update_mask=update_mask,
    )

    try:
        response = client.update_agent_pool(request=request)
        print(f"Updated agent pool: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update agent pool: {error}")
# [END storagetransfer_v1_storagetransferservice_agentpool_update]
