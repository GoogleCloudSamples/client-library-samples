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

# [START storagetransfer_v1_storagetransferservice_agentpool_delete]
from google.api_core import exceptions
from google.cloud import storage_transfer_v1


def delete_agent_pool(project_id: str, agent_pool_id: str) -> None:
    """Deletes an agent pool in Storage Transfer Service.

    Args:
        project_id: The ID of the Google Cloud project that owns the agent pool.
        agent_pool_id: The caller-chosen ID of the agent pool to delete.
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    name = f"projects/{project_id}/agentPools/{agent_pool_id}"
    request = storage_transfer_v1.DeleteAgentPoolRequest(name=name)

    try:
        client.delete_agent_pool(request=request)
        print(f"Deleted agent pool: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete agent pool: {error}")
# [END storagetransfer_v1_storagetransferservice_agentpool_delete]
