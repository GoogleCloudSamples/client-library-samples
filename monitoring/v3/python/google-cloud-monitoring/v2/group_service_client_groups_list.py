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

# [START monitoring_v3_groupservice_list_groups]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_groups(project_id: str) -> None:
    """Lists monitoring groups for a given project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.GroupServiceClient()
    project_name = client.common_project_path(project_id)

    try:
        request = monitoring_v3.ListGroupsRequest(name=project_name)

        page_result = client.list_groups(request=request)

        found_groups = False
        for group in page_result:
            found_groups = True
            print(f"Group: {group.name}")
            print(f"  Display Name: {group.display_name}")
            print(f"  Filter: {group.filter}")
            if group.parent_name:
                print(f"  Parent Group: {group.parent_name}")

        if not found_groups:
            print(f"No monitoring groups found for project: {project_id}")

    except exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' not found or you do not have "
            "permission to access it. Please check the project ID and your permissions."
        )
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to access project '{project_id}'. "
            "Ensure the service account or user has the 'Monitoring Viewer' role "
            "or equivalent permissions."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_groupservice_list_groups]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists monitoring groups for a given project."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    args = parser.parse_args()
    list_groups(project_id=args.project_id)
