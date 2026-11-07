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

# [START dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
import google.api_core.exceptions
from google.cloud import dataproc_v1


def delete_workflow_template(
    project_id: str, region_id: str, template_id: str
) -> None:
    """Deletes a workflow template.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-central1').
        template_id: The ID of the template (for example, 'example-template-id').
    """
    endpoint = (
        f"{region_id}-dataproc.googleapis.com:443"
        if region_id != "global"
        else "dataproc.googleapis.com:443"
    )
    client = dataproc_v1.WorkflowTemplateServiceClient(
        client_options={"api_endpoint": endpoint}
    )

    name = client.workflow_template_path(project_id, region_id, template_id)

    try:
        client.delete_workflow_template(name=name)
        print(f"Deleted workflow template: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error deleting workflow template: {error}")
# [END dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
