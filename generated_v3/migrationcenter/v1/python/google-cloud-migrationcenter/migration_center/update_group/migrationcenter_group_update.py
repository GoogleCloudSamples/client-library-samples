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

# [START migrationcenter_v1_migrationcenter_group_update]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1
from google.protobuf import field_mask_pb2

client = migrationcenter_v1.MigrationCenterClient()


def update_group(project_id: str, location_id: str, group_id: str) -> None:
    """Use the update_group method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        group_id: The user-specified ID of the existing group to update.
    """
    group = migrationcenter_v1.Group(
        name=f"projects/{project_id}/locations/{location_id}/groups/{group_id}",
        display_name="Updated Example Group Display Name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_group(
            group=group,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated group: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Update group failed: {error}")
# [END migrationcenter_v1_migrationcenter_group_update]
