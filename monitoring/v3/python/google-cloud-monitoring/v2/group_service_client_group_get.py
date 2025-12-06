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

# [START monitoring_v3_groupservice_group_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_group(project_id: str, group_id: str) -> None:
    """Retrieve a specific monitoring group.

    Args:
        project_id: The Google Cloud project ID.
        group_id: The ID of the monitoring group to retrieve. For example: 'my-group-123'.
    """
    client = monitoring_v3.GroupServiceClient()

    group_name = client.group_path(project_id, group_id)

    try:
        group = client.get_group(name=group_name)

        print(f"Group: {group.name}")
        print(f"  Display Name: {group.display_name}")
        print(f"  Filter: {group.filter}")
        print(f"  Is Cluster: {group.is_cluster}")
        if group.parent_name:
            print(f"  Parent Group: {group.parent_name}")

    except exceptions.NotFound:
        print(
            f"Error: Group '{group_id}' not found in project '{project_id}'. "
            "Please ensure the group ID and project ID are correct and that you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred while retrieving group '{group_id}': {e}")
        print("Please check your network connection, project ID, and permissions.")


# [END monitoring_v3_groupservice_group_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a specific monitoring group."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--group_id",
        required=True,
        help="The ID of the monitoring group to retrieve.",
    )
    args = parser.parse_args()
    get_group(project_id=args.project_id, group_id=args.group_id)
