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

# [START monitoring_v3_groupservice_group_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def update_group(
    project_id: str,
    group_id: str,
) -> None:
    """Updates an existing Google Cloud Monitoring group.

    Args:
        project_id: The Google Cloud project ID.
        group_id: The ID of the group to update.
    """
    client = monitoring_v3.GroupServiceClient()

    group_name = client.group_path(project_id, group_id)

    updated_group = monitoring_v3.Group(
        name=group_name,
        display_name="My New Display Name For Monitoring Group",
        # example value
        filter='resource.type = "gce_instance" AND metadata.system_labels.region = "us-central1"',
    )

    request = monitoring_v3.UpdateGroupRequest(group=updated_group)

    try:
        response = client.update_group(request=request)
        print(f"Group: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Is Cluster: {response.is_cluster}")
    except exceptions.NotFound:
        print(
            f"Error: Group '{group_name}' not found. "
            "Please ensure the group ID is correct and the group exists."
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error updating group '{group_name}': Invalid argument provided. "
            f"Details: {e}"
        )
        print("Please check the format of the new display name or filter expression.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_groupservice_group_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Google Cloud Monitoring group."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--group_id", required=True, help="The ID of the group to update."
    )
    args = parser.parse_args()

    update_group(
        project_id=args.project_id,
        group_id=args.group_id,
    )
