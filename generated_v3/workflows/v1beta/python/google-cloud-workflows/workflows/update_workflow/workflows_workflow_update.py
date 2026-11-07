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

# [START workflows_v1beta_workflows_workflow_update]
import google.api_core.exceptions
from google.cloud import workflows_v1beta
from google.protobuf import field_mask_pb2

client = workflows_v1beta.WorkflowsClient()


def update_workflow(project_id: str, location_id: str, workflow_id: str) -> None:
    """Updates an existing workflow's description.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1') hosting the workflow.
        workflow_id: The ID of the workflow to update.
    """
    workflow = workflows_v1beta.Workflow(
        name=f"projects/{project_id}/locations/{location_id}/workflows/{workflow_id}",
        description="Updated workflow description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_workflow(
            workflow=workflow,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Workflow updated: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Workflow update failed: {exc}")
# [END workflows_v1beta_workflows_workflow_update]
