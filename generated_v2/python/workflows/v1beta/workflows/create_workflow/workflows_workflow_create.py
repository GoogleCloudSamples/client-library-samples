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

# [START workflows_v1beta_workflows_workflow_create]
import google.api_core.exceptions
from google.cloud import workflows_v1beta

client = workflows_v1beta.WorkflowsClient()


def create_workflow(project_id: str, location_id: str, workflow_id: str) -> None:
    """Creates a new workflow in the specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        workflow_id: ID of the Workflow (for example, 'example-workflow-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    workflow = workflows_v1beta.Workflow(
        description="A sample workflow",
        source_contents=(
            "- getCurrentTime:\n"
            "    call: http.get\n"
            "    args:\n"
            "        url: https://timeapi.io/api/Time/current/zone?timeZone=UTC\n"
            "    result: currentTime\n"
            "- returnResult:\n"
            "    return: ${currentTime.body}\n"
        ),
    )

    try:
        operation = client.create_workflow(
            parent=parent,
            workflow=workflow,
            workflow_id=workflow_id,
        )
        response = operation.result()
        print(f"Created workflow: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create workflow: {e}")
# [END workflows_v1beta_workflows_workflow_create]
