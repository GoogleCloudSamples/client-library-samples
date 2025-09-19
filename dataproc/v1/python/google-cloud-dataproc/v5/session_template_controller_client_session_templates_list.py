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

# [START dataproc_v1_sessiontemplatecontroller_sessiontemplates_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_session_templates(
    project_id: str,
    location: str,
) -> None:
    """Lists Dataproc session templates within a specified project and location.

    Session templates are reusable configurations for creating interactive
    Dataproc sessions. This method retrieves a paginated list of these templates.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session templates are located
                  (e.g., 'us-central1').
    """

    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.SessionTemplateControllerClient(client_options=options)

    parent = f"projects/{project_id}/locations/{location}"

    try:
        print(f"Listing session templates in {parent}:")
        page_result = client.list_session_templates(parent=parent)

        found_templates = False
        for session_template in page_result:
            found_templates = True
            print(f"- Session Template Name: {session_template.name}")
            print(f"  Description: {session_template.description}")
            print(f"  Create Time: {session_template.create_time.isoformat()}")
            if session_template.runtime_config.version:
                print(f"  Runtime Version: {session_template.runtime_config.version}")
            print("\n")

        if not found_templates:
            print(f"No session templates found in {parent}.")

    except exceptions.NotFound:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' "
            "does not exist or is not valid. Please ensure the project ID and "
            "location are correct and that the Dataproc API is enabled."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please check your network connection, project permissions, or API status."
        )


# [END dataproc_v1_sessiontemplatecontroller_sessiontemplates_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataproc session templates in a given project and location."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud Project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_session_templates(args.project_id, args.location)
