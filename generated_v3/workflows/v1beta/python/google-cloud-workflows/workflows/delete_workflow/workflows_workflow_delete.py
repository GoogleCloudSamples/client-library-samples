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

# [START workflows_v1beta_workflows_workflow_delete]
import google.api_core.exceptions
from google.cloud import workflows_v1beta

client = workflows_v1beta.WorkflowsClient()


def delete_workflow(project_id: str, location_id: str, workflow_id: str) -> None:
    """Use the delete_workflow method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        workflow_id: ID of the Workflow (for example, 'example-workflow-id')
    """
    name = client.workflow_path(project_id, location_id, workflow_id)

    try:
        operation = client.delete_workflow(name=name)
        operation.result()
        print(f"Deleted workflow: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Deletion failed: {error}")
# [END workflows_v1beta_workflows_workflow_delete]
