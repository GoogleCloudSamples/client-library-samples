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

# [START dataproc_v1_workflowtemplateservice_delete_workflow_template]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_workflow_template(
    project_id: str,
    location: str,
    workflow_template_id: str,
) -> None:
    """
    Deletes a Dataproc workflow template.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the workflow template is located.
            (e.g., 'us-central1')
        workflow_template_id: The ID of the workflow template to delete.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.WorkflowTemplateServiceClient(client_options=options)

    name = client.workflow_template_path(project_id, location, workflow_template_id)

    try:
        client.delete_workflow_template(name=name)
        print(f"Workflow template '{workflow_template_id}' deleted successfully.")

    except exceptions.NotFound:
        print(
            f"Error: Workflow template '{workflow_template_id}' not found in region '{location}'."
        )
        print("Please ensure the template ID and region are correct.")
    except Exception as e:
        print(f"Error deleting workflow template '{workflow_template_id}': {e}")
        print(
            "Please check your project ID, region, and ensure you have the necessary permissions."
        )


# [END dataproc_v1_workflowtemplateservice_delete_workflow_template]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Dataproc workflow template."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the workflow template is located (e.g., 'us-central1')."
    )
    parser.add_argument(
        "--workflow_template_id",
        type=str,
        required=True,
        help="The ID of the workflow template to delete."
    )

    args = parser.parse_args()

    delete_workflow_template(
        args.project_id,
        args.location,
        args.workflow_template_id,
    )
