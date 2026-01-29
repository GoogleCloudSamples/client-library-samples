# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START storage_v2_storagecontrol_projectintelligenceconfig_get]
# [START storage_storagecontrol_projectintelligenceconfig_get]
# [START storage_control_projectintelligenceconfig_get]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def get_project_intelligence_config(
    project_id: str,
) -> None:
    """
    Retrieves the project-scoped singleton IntelligenceConfig resource.

    This resource provides configuration for Storage Intelligence features
    at the project level.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = storage_control_v2.StorageControlClient()

    name = f"projects/{project_id}/locations/global/intelligenceConfig"

    try:
        intelligence_config = client.get_project_intelligence_config(name=name)

        print(f"Successfully retrieved IntelligenceConfig for project: {project_id}")
        print(f"Name: {intelligence_config.name}")
        print(f"Edition Config: {intelligence_config.edition_config.name}")
        print(f"Update Time: {intelligence_config.update_time}")
        if intelligence_config.effective_intelligence_config:
            print(
                "Effective Edition:"
                f" {intelligence_config.effective_intelligence_config.effective_edition.name}"
            )
            print(
                "Effective Intelligence Config Resource:"
                f" {intelligence_config.effective_intelligence_config.intelligence_config}"
            )

    except google.api_core.exceptions.NotFound:
        print(
            "IntelligenceConfig not found for project:"
            f" {project_id}. It might not be configured yet."
        )
    except Exception as e:
        print(f"Error retrieving IntelligenceConfig: {e}")


# [END storage_control_projectintelligenceconfig_get]
# [END storage_storagecontrol_projectintelligenceconfig_get]
# [END storage_v2_storagecontrol_projectintelligenceconfig_get]
