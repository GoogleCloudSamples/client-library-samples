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

# [START migrationcenter_v1_migrationcenter_preferenceset_create]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def create_preference_set(
    preference_set_id: str, project_id: str, location_id: str
) -> None:
    """Creates a preference set in Google Cloud Migration Center.

    Args:
        preference_set_id: Caller-chosen unique identifier for the preference
          set conforming to RFC-1034 (for example, 'example-preference-set-id').
        project_id: Target Google Cloud project ID.
        location_id: Target Google Cloud location or region (for example,
          'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    preference_set = migrationcenter_v1.PreferenceSet(
        display_name="Example Preference Set",
        description="Example preference set description",
    )

    try:
        operation = client.create_preference_set(
            parent=parent,
            preference_set_id=preference_set_id,
            preference_set=preference_set,
        )
        response = operation.result()
        print(f"Created preference set: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create preference set: {e}")
# [END migrationcenter_v1_migrationcenter_preferenceset_create]
