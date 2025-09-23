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

# [START monitoring_v3_groupservice_group_delete]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def delete_group(
    project_id: str, group_id: str, recursive: bool = False
) -> None:
    """Deletes an existing Google Cloud Monitoring group.

    Args:
        project_id: The Google Cloud project ID.
        group_id: The ID of the monitoring group to delete.
        recursive: If set, deletes the group and all its descendants.
            Otherwise, the group can only be deleted if it has no descendants.
            Defaults to False.
    """
    client = monitoring_v3.GroupServiceClient()
    group_name = client.group_path(project_id, group_id)

    request = monitoring_v3.DeleteGroupRequest(
        name=group_name,
        recursive=recursive,
    )

    try:
        client.delete_group(request=request)
        print(f"Deleted group: {group_name}")
    except exceptions.NotFound:
        print(f"Error: Monitoring group '{group_name}' not found.")
    except exceptions.FailedPrecondition as e:
        # This error typically occurs if 'recursive=False' and the group has child groups.
        print(f"Error deleting monitoring group '{group_name}': {e}")
        print(
            "Hint: If the group has child groups, try setting '--recursive' flag "
            "to delete the group and its descendants."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_groupservice_group_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes an existing Google Cloud Monitoring group."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--group_id",
        required=True,
        help="The ID of the monitoring group to delete.",
    )
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="If set, deletes the group and all its descendants. "
        "Otherwise, the group can only be deleted if it has no descendants.",
    )

    args = parser.parse_args()
    delete_group(
        project_id=args.project_id, group_id=args.group_id, recursive=args.recursive
    )
