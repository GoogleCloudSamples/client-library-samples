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

# [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_delete]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_session_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Deletes a Dataproc session template.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session template is located
            (e.g., 'us-central1').
        template_id: The ID of the session template to delete.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.SessionTemplateControllerClient(client_options=options)

    name = client.session_template_path(project_id, location, template_id)

    request = dataproc_v1.DeleteSessionTemplateRequest(name=name)

    try:
        client.delete_session_template(request=request)
        print(
            f"Session template '{template_id}' in project '{project_id}' and location '{location}' deleted successfully."
        )
    except exceptions.NotFound:
        print(
            f"Error: Session template '{template_id}' not found. It may have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataproc session template.")
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region where the session template is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        type=str,
        help="The ID of the session template to delete.",
        required=True,
    )

    args = parser.parse_args()

    delete_session_template(
        args.project_id,
        args.location,
        args.template_id,
    )
