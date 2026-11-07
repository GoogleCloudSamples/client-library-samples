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

# [START vmmigration_v1_vmmigration_group_delete]
import google.api_core.exceptions
from google.cloud import vmmigration_v1

client = vmmigration_v1.VmMigrationClient()


def delete_group(project_id: str, location_id: str, group_id: str) -> None:
    """Use the delete_group method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Group is located.
        group_id: The caller-chosen identifier of the Group to delete.
    """
    name = client.group_path(project_id, location_id, group_id)

    try:
        operation = client.delete_group(name=name)
        operation.result()
        print(f"Deleted group: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete group: {error}")
# [END vmmigration_v1_vmmigration_group_delete]
