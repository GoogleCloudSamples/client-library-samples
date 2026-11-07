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

# [START container_v1_clustermanager_operation_get]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def get_operation(project_id: str, location_id: str, operation_id: str) -> None:
    """Use the get_operation method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone of the operation.
        operation_id: The server-assigned ID of the operation.
    """
    name = f"projects/{project_id}/locations/{location_id}/operations/{operation_id}"

    try:
        operation = client.get_operation(name=name)
        print(f"Operation status: {operation.status.name}")
        print(f"Operation type: {operation.operation_type.name}")
        print(f"Target resource: {operation.target_link}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve operation: {e.message}")
# [END container_v1_clustermanager_operation_get]
