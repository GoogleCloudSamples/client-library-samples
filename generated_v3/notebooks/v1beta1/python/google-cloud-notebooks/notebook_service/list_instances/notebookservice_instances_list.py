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

# [START notebooks_v1beta1_notebookservice_instances_list]
from google.api_core import exceptions
from google.cloud import notebooks_v1beta1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Notebooks instances in a specified Google Cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = notebooks_v1beta1.NotebookServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = notebooks_v1beta1.ListInstancesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_instances(request=request)
        instances_found = False
        for instance in page_result:
            print(f"Instance: {instance.name}")
            instances_found = True

        if not instances_found:
            print("No instances found.")
    except exceptions.GoogleAPICallError as err:
        print(f"API request failed: {err}")
# [END notebooks_v1beta1_notebookservice_instances_list]
