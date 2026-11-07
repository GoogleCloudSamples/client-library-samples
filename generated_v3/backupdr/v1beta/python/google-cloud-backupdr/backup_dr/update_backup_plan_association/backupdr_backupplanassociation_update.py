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

# [START backupdr_v1beta_backupdr_backupplanassociation_update]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta
from google.protobuf import field_mask_pb2

client = backupdr_v1beta.BackupDRClient()


def update_backup_plan_association(
    project_id: str,
    location_id: str,
    backup_plan_association_id: str,
    backup_plan_id: str,
) -> None:
    """Use the update_backup_plan_association method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the backup plan association resides.
        backup_plan_association_id: The ID of the existing backup plan association to update.
        backup_plan_id: The ID of the new backup plan to associate with the workload.
    """
    association_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"backupPlanAssociations/{backup_plan_association_id}"
    )
    plan_name = (
        f"projects/{project_id}/locations/{location_id}/backupPlans/{backup_plan_id}"
    )

    backup_plan_association = backupdr_v1beta.BackupPlanAssociation(
        name=association_name,
        backup_plan=plan_name,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["backup_plan"])

    try:
        operation = client.update_backup_plan_association(
            backup_plan_association=backup_plan_association,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated backup plan association: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END backupdr_v1beta_backupdr_backupplanassociation_update]
