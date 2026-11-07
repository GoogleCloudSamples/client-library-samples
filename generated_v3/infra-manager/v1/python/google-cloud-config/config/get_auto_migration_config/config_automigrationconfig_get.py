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

# [START infra-manager_v1_config_automigrationconfig_get]
import google.api_core.exceptions
from google.cloud import config_v1

client = config_v1.ConfigClient()


def get_auto_migration_config(project_id: str, location_id: str) -> None:
    """Retrieves the auto-migration configuration for a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    name = f"projects/{project_id}/locations/{location_id}/autoMigrationConfig"

    try:
        response = client.get_auto_migration_config(name=name)
        print(f"Auto-migration configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve auto-migration configuration: {error}")
# [END infra-manager_v1_config_automigrationconfig_get]
