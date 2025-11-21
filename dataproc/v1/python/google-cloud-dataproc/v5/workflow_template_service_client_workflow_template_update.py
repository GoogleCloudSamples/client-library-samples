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

# [START dataproc_v1_workflowtemplateservice_workflowtemplate_update]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def update_workflow_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Updates an existing Dataproc workflow template.

    The update operation requires fetching the current version of the template,
    modifying it, and then sending the updated template back. This ensures
    optimistic locking, preventing concurrent updates from overwriting each other.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the workflow template is located
            (e.g., 'us-central1').
        template_id: The ID of the workflow template to update.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.WorkflowTemplateServiceClient(client_options=options)

    template_name = client.workflow_template_path(project_id, location, template_id)

    try:
        print(f"Attempting to retrieve workflow template: {template_name}")
        existing_template = client.get_workflow_template(name=template_name)
        print(
            f"Successfully retrieved template '{existing_template.name}' (version: {existing_template.version})"
        )

        existing_template.labels["updated_by"] = "python-sample"

        updated_template = client.update_workflow_template(template=existing_template)

        print(f"Workflow template '{updated_template.name}' updated successfully.")
        print(f"New version: {updated_template.version}")
        print(f"Updated labels: {updated_template.labels}")

    except exceptions.NotFound:
        print(
            f"Error: Workflow template '{template_id}' not found in project "
            f"'{project_id}' and region '{location}'. Please ensure the template exists."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Error updating workflow template '{template_id}': {e}. "
            "This might happen if the template was modified by another process "
            "between retrieval and update. Please retry the operation."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_workflowtemplateservice_workflowtemplate_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Dataproc workflow template."
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
        help="The ID of the workflow template to update.",
    )
    args = parser.parse_args()

    update_workflow_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
