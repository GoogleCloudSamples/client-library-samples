# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START dataproc_v1_workflowtemplateservice_workflowtemplate_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_dataproc_workflow_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Retrieves a Google Cloud Dataproc workflow template.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the workflow template is located.
               (e.g., 'us-central1')
        template_id: The ID of the workflow template to retrieve.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.WorkflowTemplateServiceClient(client_options=options)

    name = client.workflow_template_path(project_id, location, template_id)

    try:
        template = client.get_workflow_template(name=name)

        print(f"Successfully retrieved workflow template: {template.name}")
        print(f"Template ID: {template.id}")
        print(f"Template version: {template.version}")
        print(f"Created at: {template.create_time.isoformat()}")
        print(f"Last updated at: {template.update_time.isoformat()}")

    except exceptions.NotFound:
        print(f"Error: Workflow template '{name}' not found.")
        print("Please ensure the project ID, region, and template ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_workflowtemplateservice_workflowtemplate_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Dataproc workflow template."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The region where the workflow template is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID of the workflow template to retrieve.",
    )

    args = parser.parse_args()

    get_dataproc_workflow_template(args.project_id, args.location, args.template_id)
