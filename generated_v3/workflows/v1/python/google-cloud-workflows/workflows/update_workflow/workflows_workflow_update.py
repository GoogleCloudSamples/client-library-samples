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

# [START workflows_v1_workflows_workflow_update]
import google.api_core.exceptions
from google.cloud import workflows_v1
from google.protobuf import field_mask_pb2

client = workflows_v1.WorkflowsClient()


def update_workflow(project_id: str, location_id: str, workflow_id: str) -> None:
    """Updates an existing workflow's description.

    Args:
        project_id: The Google Cloud project ID where the workflow is hosted.
        location_id: The GCP region hosting the workflow (for example, 'us-central1').
        workflow_id: The identifier of the existing workflow to update.
    """
    workflow_name = (
        f"projects/{project_id}/locations/{location_id}/workflows/{workflow_id}"
    )
    workflow = workflows_v1.Workflow(
        name=workflow_name,
        description="Updated workflow description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_workflow(
            workflow=workflow,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated workflow: {response.name}")
        print(f"Workflow state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Workflow update failed: {e}")
# [END workflows_v1_workflows_workflow_update]
