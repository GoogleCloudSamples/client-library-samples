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

# [START infra-manager_v1_config_automigrationconfig_update]
from google.api_core import exceptions
from google.cloud import config_v1
from google.protobuf import field_mask_pb2

client = config_v1.ConfigClient()


def update_auto_migration_config(project_id: str, location_id: str) -> None:
    """Updates the AutoMigrationConfig resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) of the AutoMigrationConfig.
    """
    auto_migration_config = config_v1.AutoMigrationConfig(
        name=f"projects/{project_id}/locations/{location_id}/autoMigrationConfig",
        auto_migration_enabled=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["auto_migration_enabled"])

    try:
        operation = client.update_auto_migration_config(
            auto_migration_config=auto_migration_config,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated configuration: {response.name}")
        print(f"Auto migration enabled: {response.auto_migration_enabled}")
    except exceptions.GoogleAPIError as error:
        print(f"API request failed: {error}")
# [END infra-manager_v1_config_automigrationconfig_update]
