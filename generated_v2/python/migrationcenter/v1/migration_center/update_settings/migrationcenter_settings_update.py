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

# [START migrationcenter_v1_migrationcenter_settings_update]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1
from google.protobuf import field_mask_pb2

client = migrationcenter_v1.MigrationCenterClient()


def update_settings(project_id: str, location_id: str, preference_set_id: str) -> None:
    """Updates Migration Center settings to assign a default preference set.

    Args:
        project_id: The Google Cloud project ID hosting the Migration Center settings.
        location_id: The region ID where the Migration Center settings are located.
        preference_set_id: The ID of an existing preference set to assign as default.
    """
    settings_name = f"projects/{project_id}/locations/{location_id}/settings"
    preference_set_name = (
        f"projects/{project_id}/locations/{location_id}/preferenceSets/{preference_set_id}"
    )

    settings = migrationcenter_v1.Settings(
        name=settings_name,
        preference_set=preference_set_name,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["preference_set"])

    try:
        operation = client.update_settings(
            settings=settings,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated settings: {response.name}")
        print(f"Assigned default preference set: {response.preference_set}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Settings update failed: {error}")
# [END migrationcenter_v1_migrationcenter_settings_update]
