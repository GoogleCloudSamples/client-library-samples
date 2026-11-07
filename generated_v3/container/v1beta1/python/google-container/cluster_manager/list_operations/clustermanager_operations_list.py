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

# [START container_v1beta1_clustermanager_operations_list]
import google.api_core.exceptions
from google.cloud import container_v1beta1


def list_operations(project_id: str, location_id: str) -> None:
    """Lists operations in a Google Kubernetes Engine project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (zone, region, or '-' for all locations).
    """
    client = container_v1beta1.ClusterManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = container_v1beta1.ListOperationsRequest(parent=parent)

    try:
        response = client.list_operations(request=request)
        for operation in response.operations:
            print(f"Operation: {operation.name}")
            print(f"Status: {operation.status}")
            print(f"Type: {operation.operation_type}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END container_v1beta1_clustermanager_operations_list]
