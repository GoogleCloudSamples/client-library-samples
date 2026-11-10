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

# [START backupdr_v1_backupdr_backupplan_update]
import google.api_core.exceptions
from google.cloud import backupdr_v1
from google.protobuf import field_mask_pb2

client = backupdr_v1.BackupDRClient()


def update_backup_plan(project_id: str, location_id: str, backup_plan_id: str) -> None:
    """Updates the description of an existing backup plan.

    Args:
        project_id: The Google Cloud project ID hosting the BackupPlan.
        location_id: The Google Cloud region where the BackupPlan is located, for example "us-central1".
        backup_plan_id: The ID of the BackupPlan to update.
    """
    backup_plan_name = (
        f"projects/{project_id}/locations/{location_id}/backupPlans/{backup_plan_id}"
    )

    backup_plan = backupdr_v1.BackupPlan(
        name=backup_plan_name,
        description="Updated description for backup plan",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_backup_plan(
            backup_plan=backup_plan,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated backup plan: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update backup plan: {e}")
# [END backupdr_v1_backupdr_backupplan_update]
