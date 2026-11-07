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

# [START migrationcenter_v1_migrationcenter_preferenceset_get]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def get_preference_set(
    project_id: str, location_id: str, preference_set_id: str
) -> None:
    """Use the get_preference_set method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location/region ID.
        preference_set_id: The user-specified ID of the preference set to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/preferenceSets/"
        f"{preference_set_id}"
    )

    request = migrationcenter_v1.GetPreferenceSetRequest(name=name)

    try:
        response = client.get_preference_set(request=request)
        print(f"Retrieved preference set: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve preference set: {e}")


# [END migrationcenter_v1_migrationcenter_preferenceset_get]
