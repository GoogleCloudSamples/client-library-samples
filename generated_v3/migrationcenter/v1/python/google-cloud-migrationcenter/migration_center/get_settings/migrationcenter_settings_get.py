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

# [START migrationcenter_v1_migrationcenter_settings_get]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def get_settings(project_id: str, location_id: str) -> None:
    """Use the get_settings method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for Migration Center settings.
    """
    name = f"projects/{project_id}/locations/{location_id}/settings"

    request = migrationcenter_v1.GetSettingsRequest(
        name=name,
    )

    try:
        response = client.get_settings(request=request)
        print(f"Retrieved settings: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get settings: {error.message}")
# [END migrationcenter_v1_migrationcenter_settings_get]
