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

# [START dataproc_v1_workflowtemplateservice_workflowtemplate_update]
import google.api_core.exceptions
from google.cloud import dataproc_v1

client = dataproc_v1.WorkflowTemplateServiceClient()


def update_workflow_template(
    project_id: str, location_id: str, workflow_template_id: str
) -> None:
    """Update a Dataproc workflow template.

    Args:
        project_id: The Google Cloud project ID where the workflow template resides.
        location_id: The Dataproc region or location ID (for example, 'us-central1').
        workflow_template_id: The ID of an existing Dataproc workflow template to update.
    """
    # Dataproc requires regional endpoints for regional requests
    client = dataproc_v1.WorkflowTemplateServiceClient(
        client_options={"api_endpoint": f"{location_id}-dataproc.googleapis.com:443"}
    )

    template_name = f"projects/{project_id}/locations/{location_id}/workflowTemplates/{workflow_template_id}"

    try:
        # Retrieve the existing template to obtain the current server version
        template = client.get_workflow_template(name=template_name)

        # Modify mutable template fields while preserving DAG structure and version
        template.labels["env"] = "updated"

        response = client.update_workflow_template(template=template)
        print(f"Updated workflow template: {response.name}")
        print(f"Template version: {response.version}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update workflow template: {e}")


# [END dataproc_v1_workflowtemplateservice_workflowtemplate_update]
