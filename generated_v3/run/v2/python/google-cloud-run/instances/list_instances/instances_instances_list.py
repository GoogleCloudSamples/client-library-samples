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

# [START run_v2_instances_instances_list]
import google.api_core.exceptions
from google.cloud import run_v2


def list_instances(project_id: str, location_id: str) -> None:
    """List instances in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = run_v2.InstancesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = run_v2.ListInstancesRequest(
        parent=parent,
    )

    try:
        response = client.list_instances(request=request)
        count = 0
        for instance in response:
            print(f"Instance name: {instance.name}")
            count += 1

        if count == 0:
            print("No instances found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed with error: {e}")
# [END run_v2_instances_instances_list]
