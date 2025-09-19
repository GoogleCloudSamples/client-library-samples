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

# [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_session_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Retrieves a Dataproc session template.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session template is located
            (e.g., 'us-central1').
        template_id: The ID of the session template to retrieve.
    """
    print(
        f"Retrieving session template '{template_id}' in project '{project_id}' and location '{location}'..."
    )

    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.SessionTemplateControllerClient(client_options=options)

    name = client.session_template_path(project_id, location, template_id)

    try:
        session_template = client.get_session_template(name=name)

        print(f"Successfully retrieved session template: {session_template.name}")
        if session_template.description:
            print(f"  Description: {session_template.description}")
        print(f"  Created by: {session_template.creator}")
        print(f"  Creation Time: {session_template.create_time}")
        print(f"  UUID: {session_template.uuid}")

        if session_template.jupyter_session:
            print("  Session Type: Jupyter")
            print(f"    Kernel: {session_template.jupyter_session.kernel}")
        elif session_template.spark_connect_session:
            print("  Session Type: Spark Connect")

        if session_template.runtime_config:
            print(f"  Runtime Version: {session_template.runtime_config.version}")

    except exceptions.NotFound:
        print(f"Error: Session template '{name}' not found.")
        print("Please ensure the template ID and location are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a Dataproc session template."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud Project ID.", required=True
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
        help="The ID of the session template to retrieve.",
        required=True,
    )

    args = parser.parse_args()

    get_session_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
