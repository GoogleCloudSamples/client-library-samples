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

# [START storage_v2_storagecontrol_projectintelligenceconfig_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_project_intelligence_config(project_id: str, location_id: str) -> None:
    """Retrieves the Storage Intelligence configuration for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID, which must be 'global'.
    """
    client = storage_control_v2.StorageControlClient()

    name = f"projects/{project_id}/locations/{location_id}/intelligenceConfig"

    try:
        response = client.get_project_intelligence_config(name=name)
        print(f"Retrieved project intelligence configuration: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve project intelligence configuration: {error}")
# [END storage_v2_storagecontrol_projectintelligenceconfig_get]
