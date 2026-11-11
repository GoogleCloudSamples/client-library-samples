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

# [START container_v1beta1_clustermanager_operation_get]
import google.api_core.exceptions
import google.auth
from google.cloud import container_v1beta1


def get_operation() -> None:
    """Retrieves the details of a specific operation."""
    _, project_id = google.auth.default()
    location = "us-central1"

    client = container_v1beta1.ClusterManagerClient()

    try:
        # Retrieve an existing operation identifier from the project.
        parent = f"projects/{project_id}/locations/-"
        list_request = container_v1beta1.ListOperationsRequest(parent=parent)
        list_response = client.list_operations(request=list_request)

        if list_response.operations:
            operation = list_response.operations[0]
            if operation.name.startswith("projects/"):
                operation_name = operation.name
            else:
                op_location = operation.location or operation.zone or location
                operation_name = (
                    f"projects/{project_id}/locations/{op_location}/operations/{operation.name}"
                )

            request = container_v1beta1.GetOperationRequest(name=operation_name)
            response = client.get_operation(request=request)

            print(f"Operation name: {response.name}")
            print(f"Status: {response.status}")
            print(f"Operation type: {response.operation_type}")
        else:
            print("No operations found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")


# [END container_v1beta1_clustermanager_operation_get]
