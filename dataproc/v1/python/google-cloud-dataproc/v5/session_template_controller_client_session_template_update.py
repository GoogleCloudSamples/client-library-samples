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

# [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_update]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1 as dataproc


def update_session_template(
    project_id: str,
    location: str,
    template_id: str,
    new_description: str,
) -> None:
    """
    Updates an existing Dataproc session template.

    This sample demonstrates how to update a specific field (e.g., description)
    of an existing session template. The `update_session_template` method
    requires the full resource name of the template and the updated template
    object.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session template is located
            (e.g., "us-central1").
        template_id: The ID of the session template to update.
        new_description: The new description to set for the session template.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc.SessionTemplateControllerClient(client_options=options)

    template_name = client.session_template_path(project_id, location, template_id)

    session_template = dataproc.SessionTemplate(
        name=template_name,
        description=new_description,
    )

    try:
        updated_template = client.update_session_template(
            session_template=session_template
        )

        print(f"Session template '{updated_template.name}' updated successfully.")
        print(f"New description: {updated_template.description}")
        print(f"Updated at: {updated_template.update_time.isoformat()}")

    except exceptions.NotFound:
        print(
            f"Error: Session template '{template_name}' not found. "
            "Please ensure the project ID, location, and template ID are correct."
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided for updating session template '{template_name}'. "
            f"Details: {e}"
        )
        print(
            "Please ensure the template name format is correct and the provided "
            "fields are valid."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Updates a Dataproc session template.")
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region where the session template is located.",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        required=True,
        help="The ID of the session template to update.",
    )
    parser.add_argument(
        "--new_description",
        type=str,
        default="Updated description for the session template.",
        help="The new description for the session template.",
    )

    args = parser.parse_args()

    update_session_template(
        args.project_id,
        args.location,
        args.template_id,
        args.new_description,
    )
