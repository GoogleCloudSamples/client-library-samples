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

# [START backupdr_v1beta_backupdr_datasource_update]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta
from google.protobuf import field_mask_pb2

client = backupdr_v1beta.BackupDRClient()


def update_data_source(
    project_id: str,
    location_id: str,
    backup_vault_id: str,
    data_source_id: str,
) -> None:
    """Use the update_data_source method

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The Google Cloud region where the BackupDR DataSource is located.
        backup_vault_id: The ID of the BackupVault containing the DataSource.
        data_source_id: The ID of the DataSource to update.
    """
    data_source_name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/backupVaults/{backup_vault_id}/dataSources/{data_source_id}"
    )

    data_source = backupdr_v1beta.DataSource(
        name=data_source_name,
        labels={"env": "production"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        operation = client.update_data_source(
            data_source=data_source,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated data source: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END backupdr_v1beta_backupdr_datasource_update]
