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

# [START monitoring_v3_groupservice_list_group_members]
from google.api_core import exceptions
from google.cloud import monitoring_v3

def list_group_members(
    project_id: str,
    group_id: str,
) -> None:
    """
    Lists members of a specified Google Cloud Monitoring group.

    Args:
        project_id: Your Google Cloud project ID.
        group_id: The ID of the group to list members for (e.g., 'my-instance-group').
    """
    client = monitoring_v3.GroupServiceClient()
    group_name = client.group_path(project_id, group_id)

    try:
        request = monitoring_v3.ListGroupMembersRequest(name=group_name)

        page_result = client.list_group_members(request=request)

        print(f"Group Members: {group_name}")
        found_members = False
        for member in page_result:
            found_members = True
            print(f"  Member: {member.type}/{member.labels.get('instance_id')}")

        if not found_members:
            print(f"No members found for group: {group_name}")

    except exceptions.NotFound:
        print(
            f"Error: Group '{group_name}' not found. "
            "Please ensure the project ID and group ID are correct and the group exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_groupservice_list_group_members]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists members of a specified Google Cloud Monitoring group."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--group_id",
        type=str,
        required=True,
        help="The ID of the group to list members for.",
    )
    args = parser.parse_args()
    list_group_members(project_id=args.project_id, group_id=args.group_id)
