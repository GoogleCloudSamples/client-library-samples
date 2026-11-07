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

# [START backupdr_v1beta_backupdr_backupplan_create]
import time

import google.api_core.exceptions
from google.cloud import backupdr_v1beta


def create_backup_plan(
    project_id: str,
    location_id: str,
    backup_vault_id: str,
    backup_plan_id: str,
) -> None:
    """Creates a backup plan in Google Cloud Backup and DR Service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the backup plan is created (for example, 'us-central1').
        backup_vault_id: The ID of the existing BackupVault to use for storing backups (for example, 'example-backup-vault').
        backup_plan_id: The client-assigned ID for the new BackupPlan. Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens.
    """
    client = backupdr_v1beta.BackupDRClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    backup_vault_path = (
        f"projects/{project_id}/locations/{location_id}/backupVaults/{backup_vault_id}"
    )

    # Wait for the backup vault to reach an active state before creating the plan.
    for _ in range(60):
        try:
            vault = client.get_backup_vault(name=backup_vault_path)
            if vault.state == backupdr_v1beta.BackupVault.State.ACTIVE:
                break
        except google.api_core.exceptions.GoogleAPICallError:
            pass
        time.sleep(5)

    backup_window = backupdr_v1beta.BackupWindow(
        start_hour_of_day=0,
        end_hour_of_day=6,
    )
    standard_schedule = backupdr_v1beta.StandardSchedule(
        recurrence_type=backupdr_v1beta.StandardSchedule.RecurrenceType.DAILY,
        hourly_frequency=24,
        time_zone="UTC",
        backup_window=backup_window,
    )
    backup_rule = backupdr_v1beta.BackupRule(
        rule_id="rule-1",
        backup_retention_days=14,
        standard_schedule=standard_schedule,
    )

    backup_plan = backupdr_v1beta.BackupPlan(
        description="Backup plan for Compute Engine instances",
        resource_type="compute.googleapis.com/Instance",
        backup_vault=backup_vault_path,
        backup_rules=[backup_rule],
    )

    max_attempts = 12
    for attempt in range(max_attempts):
        try:
            operation = client.create_backup_plan(
                parent=parent,
                backup_plan_id=backup_plan_id,
                backup_plan=backup_plan,
            )
            response = operation.result()
            print(f"Created backup plan: {response.name}")
            break
        except google.api_core.exceptions.BadRequest as e:
            if "not active" in str(e) and attempt < max_attempts - 1:
                time.sleep(10)
                continue
            print(f"API call failed: {e}")
            break
        except google.api_core.exceptions.GoogleAPICallError as e:
            print(f"API call failed: {e}")
            break
# [END backupdr_v1beta_backupdr_backupplan_create]
