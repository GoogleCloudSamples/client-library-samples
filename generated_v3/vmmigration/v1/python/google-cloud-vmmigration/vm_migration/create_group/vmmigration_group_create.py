# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START vmmigration_v1_vmmigration_group_create]
import google.api_core.exceptions
from google.cloud import vmmigration_v1

client = vmmigration_v1.VmMigrationClient()


def create_group(group_id: str, project_id: str, location_id: str) -> None:
    """Creates a migration group in Migrate to Virtual Machines.

    Args:
        group_id: The user-chosen identifier for the group to create.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region/location ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    group = vmmigration_v1.Group(
        description="Example migration group description",
        display_name="Example Migration Group",
    )

    try:
        operation = client.create_group(
            parent=parent,
            group_id=group_id,
            group=group,
        )
        response = operation.result()
        print(f"Created group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create group: {error}")


# [END vmmigration_v1_vmmigration_group_create]
