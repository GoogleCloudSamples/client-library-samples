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

# [START dataproc_v1_workflowtemplateservice_workflowtemplates_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_workflow_templates(
    project_id: str,
    location: str,
) -> None:
    """
    Lists Dataproc workflow templates in a given project and region.

    This sample demonstrates how to retrieve a list of all existing workflow
    templates. Workflow templates define reusable graphs of jobs that can be
    instantiated to run complex data processing pipelines.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the workflow templates are located.
            (e.g., 'us-central1')
    """

    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.WorkflowTemplateServiceClient(client_options=options)

    parent = f"projects/{project_id}/regions/{location}"

    try:
        print(f"Listing workflow templates in {parent}...")
        request = dataproc_v1.ListWorkflowTemplatesRequest(parent=parent)
        page_result = client.list_workflow_templates(request=request)

        found_templates = False
        for template in page_result:
            found_templates = True
            print(f"  Found workflow template: {template.name} (ID: {template.id})")

        if not found_templates:
            print(f"No workflow templates found in {parent}.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project or region was not found: {parent}. "
            f"Please ensure the project ID and region are correct and that the "
            f"Dataproc API is enabled for this project.\nDetails: {e}"
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_workflowtemplateservice_workflowtemplates_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataproc workflow templates in a project and region."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the workflow templates are located.",
    )
    args = parser.parse_args()

    list_workflow_templates(args.project_id, args.location)
