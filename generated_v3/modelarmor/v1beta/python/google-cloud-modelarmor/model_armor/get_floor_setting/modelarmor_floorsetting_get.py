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

# [START modelarmor_v1beta_modelarmor_floorsetting_get]
from google.api_core import exceptions
from google.cloud import modelarmor_v1beta


def get_floor_setting(project_id: str, location_id: str) -> None:
    """Gets the Model Armor floor setting for a project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global').
    """
    # Floor settings in Model Armor are global resources.
    if location_id != "global":
        location_id = "global"

    client = modelarmor_v1beta.ModelArmorClient()

    name = f"projects/{project_id}/locations/{location_id}/floorSetting"
    request = modelarmor_v1beta.GetFloorSettingRequest(name=name)

    try:
        response = client.get_floor_setting(request=request)
        print(f"Retrieved floor setting: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve floor setting: {error}")
# [END modelarmor_v1beta_modelarmor_floorsetting_get]
