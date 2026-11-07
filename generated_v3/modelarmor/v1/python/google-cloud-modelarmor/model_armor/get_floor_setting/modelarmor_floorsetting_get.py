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

# [START modelarmor_v1_modelarmor_floorsetting_get]
import google.api_core.exceptions
from google.cloud import modelarmor_v1

client = modelarmor_v1.ModelArmorClient()


def get_floor_setting(project_id: str, location_id: str) -> None:
    """Gets the floor setting for a project and location.

    Args:
        project_id: The Google Cloud project ID containing the floor setting.
        location_id: The Google Cloud location ID (for example, 'global').
    """
    name = f"projects/{project_id}/locations/{location_id}/floorSetting"

    request = modelarmor_v1.GetFloorSettingRequest(name=name)

    try:
        response = client.get_floor_setting(request=request)
        print(f"Retrieved floor setting: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve floor setting: {e}")
# [END modelarmor_v1_modelarmor_floorsetting_get]
