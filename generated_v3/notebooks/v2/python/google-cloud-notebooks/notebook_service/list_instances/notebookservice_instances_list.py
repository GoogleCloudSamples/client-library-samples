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

# [START notebooks_v2_list_instances]
import google.api_core.exceptions
from google.cloud import notebooks_v2


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Notebooks v2 instances in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = notebooks_v2.NotebookServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = notebooks_v2.ListInstancesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_instances(request=request)
        instance_found = False
        for instance in page_result:
            print(f"Instance name: {instance.name}")
            instance_found = True

        if not instance_found:
            print("No instances found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END notebooks_v2_list_instances]
