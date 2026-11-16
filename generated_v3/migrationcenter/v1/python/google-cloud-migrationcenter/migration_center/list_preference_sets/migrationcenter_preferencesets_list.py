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

# [START migrationcenter_v1_migrationcenter_preferencesets_list]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def list_preference_sets(project_id: str, location_id: str) -> None:
    """Lists preference sets in a specified Google Cloud location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, for example, 'us-central1'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    request = migrationcenter_v1.ListPreferenceSetsRequest(parent=parent)

    try:
        page_result = client.list_preference_sets(request=request)
        for preference_set in page_result:
            print(f"Preference set name: {preference_set.name}")
            print(f"Description: {preference_set.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END migrationcenter_v1_migrationcenter_preferencesets_list]
