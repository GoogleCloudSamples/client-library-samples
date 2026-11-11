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

# [START workflows_v1_workflows_workflows_list]
import google.api_core.exceptions
from google.cloud import workflows_v1

client = workflows_v1.WorkflowsClient()


def list_workflows(project_id: str, location_id: str) -> None:
    """List workflows in a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = workflows_v1.ListWorkflowsRequest(
        parent=parent,
    )

    try:
        response = client.list_workflows(request=request)
        for workflow in response:
            print(f"Workflow: {workflow.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END workflows_v1_workflows_workflows_list]
