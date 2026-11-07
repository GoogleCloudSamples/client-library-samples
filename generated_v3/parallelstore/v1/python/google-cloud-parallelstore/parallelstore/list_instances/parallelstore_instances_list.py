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

# [START parallelstore_v1_parallelstore_instances_list]
import google.api_core.exceptions
from google.cloud import parallelstore_v1


def list_instances(project_id: str, location_id: str) -> None:
    """List Parallelstore instances in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud zone or '-' to retrieve instances across all locations (for example, 'us-central1-a' or '-').
    """
    client = parallelstore_v1.ParallelstoreClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = parallelstore_v1.ListInstancesRequest(parent=parent)

    try:
        response = client.list_instances(request=request)
        instances_found = False
        for instance in response:
            instances_found = True
            print(f"Instance name: {instance.name}")
            print(f"State: {instance.state.name}")
            print(f"Capacity (GiB): {instance.capacity_gib}")

        if not instances_found:
            print("No instances found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list instances: {error}")
# [END parallelstore_v1_parallelstore_instances_list]
