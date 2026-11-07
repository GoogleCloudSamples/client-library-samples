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

# [START vmmigration_v1_vmmigration_group_get]
import google.api_core.exceptions
from google.cloud import vmmigration_v1

client = vmmigration_v1.VmMigrationClient()


def get_group(project_id: str, location_id: str, group_id: str) -> None:
    """Retrieves details of a migration group.

    Args:
        project_id: The Google Cloud project ID hosting the migration group.
        location_id: The Google Cloud region or location ID (for example, "us-central1").
        group_id: The identifier of the migration group.
    """
    name = f"projects/{project_id}/locations/{location_id}/groups/{group_id}"

    request = vmmigration_v1.GetGroupRequest(name=name)

    try:
        response = client.get_group(request=request)
        print(f"Group name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve group: {error}")
# [END vmmigration_v1_vmmigration_group_get]
