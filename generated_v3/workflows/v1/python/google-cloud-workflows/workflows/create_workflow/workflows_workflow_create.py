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

# [START workflows_v1_workflows_workflow_create]
import google.api_core.exceptions
from google.cloud import workflows_v1

client = workflows_v1.WorkflowsClient()


def create_workflow(project_id: str, location_id: str, workflow_id: str) -> None:
    """Use the create_workflow method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        workflow_id: ID of the Workflow (for example, 'example-workflow-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    workflow = workflows_v1.Workflow(
        description="Example workflow created with the Workflows API.",
        source_contents=(
            "main:\n"
            "  steps:\n"
            "    - init:\n"
            "        assign:\n"
            "          - message: 'Workflow initialized successfully'\n"
            "    - returnOutput:\n"
            "        return: ${message}\n"
        ),
    )

    try:
        # Initiate the long-running operation to create the workflow
        operation = client.create_workflow(
            parent=parent,
            workflow=workflow,
            workflow_id=workflow_id,
        )
        response = operation.result()
        print(f"Created workflow: {response.name}")
        print(f"Workflow state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create workflow: {error}")
# [END workflows_v1_workflows_workflow_create]
