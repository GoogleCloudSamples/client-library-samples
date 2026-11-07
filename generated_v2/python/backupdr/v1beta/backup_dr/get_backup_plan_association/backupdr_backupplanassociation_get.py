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

# [START backupdr_v1beta_backupdr_backupplanassociation_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta

client = backupdr_v1beta.BackupDRClient()


def get_backup_plan_association(
    project_id: str, location_id: str, backup_plan_association_id: str
) -> None:
    """Retrieves details of a specific BackupPlanAssociation.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the BackupPlanAssociation resides (for example, 'us-central1').
        backup_plan_association_id: The identifier of the BackupPlanAssociation (for example, 'example-backup-plan-association').
    """
    name = f"projects/{project_id}/locations/{location_id}/backupPlanAssociations/{backup_plan_association_id}"

    try:
        response = client.get_backup_plan_association(name=name)
        print(f"Retrieved BackupPlanAssociation: {response.name}")
        print(f"Backup Plan: {response.backup_plan}")
        print(f"Resource: {response.resource}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END backupdr_v1beta_backupdr_backupplanassociation_get]
