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

# [START dataproc_v1_workflowtemplateservice_workflowtemplate_get]
from google.api_core import exceptions
from google.cloud import dataproc_v1


def get_workflow_template(project_id: str, region_id: str, template_id: str) -> None:
    """Retrieves a workflow template from Cloud Dataproc.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the template is located (for example, 'us-central1').
        template_id: The ID of the workflow template (for example, 'example-template-id').
    """
    # Configure the client to connect to the region-specific Dataproc endpoint.
    endpoint = (
        f"{region_id}-dataproc.googleapis.com:443"
        if region_id != "global"
        else "dataproc.googleapis.com:443"
    )
    client = dataproc_v1.WorkflowTemplateServiceClient(
        client_options={"api_endpoint": endpoint}
    )

    # Construct the resource name from the project, region, and template identifiers.
    name = f"projects/{project_id}/regions/{region_id}/workflowTemplates/{template_id}"

    request = dataproc_v1.GetWorkflowTemplateRequest(
        name=name,
    )

    try:
        response = client.get_workflow_template(request=request)
        print(f"Retrieved workflow template: {response.name}")
        print(f"Template ID: {response.id}")
        print(f"Version: {response.version}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve workflow template: {error.message}")
# [END dataproc_v1_workflowtemplateservice_workflowtemplate_get]
