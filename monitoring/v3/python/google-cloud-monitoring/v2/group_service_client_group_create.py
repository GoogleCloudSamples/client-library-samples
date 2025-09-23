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

# [START monitoring_create_group]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_monitoring_group(
    project_id: str,
) -> None:
    """Creates a new monitoring group in a Google Cloud project.

    A monitoring group is a dynamic collection of monitored resources defined by a filter.
    This function demonstrates how to create such a group.

    Args:
        project_id: Your Google Cloud project ID.
    """
    client = monitoring_v3.GroupServiceClient()
    parent_project_name = f"projects/{project_id}"

    # These are example values for this sample.
    display_name = "My example monitoring group"
    example_filter = 'resource.type = "gce_instance" AND metadata.system_labels.region = "us-central1"'

    new_group = monitoring_v3.Group(
        display_name=display_name,
        filter=example_filter,
        parent_name="",  # No parent for this example
        is_cluster=False,  # Set to True if the group members are considered a cluster.
    )

    try:
        created_group = client.create_group(name=parent_project_name, group=new_group)
        print(f"Group: {created_group.name}")
        print(f"  Display Name: {created_group.display_name}")
        print(f"  Filter: {created_group.filter}")
        print(f"  Is Cluster: {created_group.is_cluster}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: A group with display name '{display_name}' and filter "
            f"'{example_filter}' might already exist, or there was a conflict. "
            f"Please try a different display name or modify the filter. Details: {e}"
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error: The provided group filter '{example_filter}' is invalid. "
            f"Please check the filter syntax. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_create_group]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new monitoring group in a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="Your Google Cloud project ID.",
    )
    args = parser.parse_args()
    create_monitoring_group(
        project_id=args.project_id,
    )
