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

# [START datafusion_v1_datafusion_instances_list]
from google.api_core import exceptions
from google.cloud import data_fusion_v1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Cloud Data Fusion instances in a specific project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = data_fusion_v1.DataFusionClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = data_fusion_v1.ListInstancesRequest(
        parent=parent,
    )

    try:
        response = client.list_instances(request=request)
        found = False
        for instance in response:
            found = True
            print(f"Instance name: {instance.name}")
            print(f"Instance state: {instance.state.name}")
            print(f"Instance type: {instance.type_.name}")

        if not found:
            print(f"No Cloud Data Fusion instances found in {parent}.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list instances: {e}")
# [END datafusion_v1_datafusion_instances_list]
