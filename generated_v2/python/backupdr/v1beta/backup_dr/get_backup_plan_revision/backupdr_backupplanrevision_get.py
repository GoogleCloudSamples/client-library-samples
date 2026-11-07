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

# [START backupdr_v1beta_backupdr_backupplanrevision_get]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta


def get_backup_plan_revision(
    project_id: str, location_id: str, backup_plan_id: str, revision_id: str
) -> None:
    """Retrieves a BackupPlanRevision resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        backup_plan_id: The ID of the BackupPlan (for example, 'example-backupplan-id').
        revision_id: The ID of the Revision (for example, 'example-revision-id').
    """
    client = backupdr_v1beta.BackupDRClient()

    # Clean identifiers if passed with resource prefixes
    clean_project_id = project_id.removeprefix("projects/")
    clean_location_id = location_id.removeprefix("locations/")
    clean_backup_plan_id = backup_plan_id.split("/")[-1]
    clean_revision_id = revision_id.split("/")[-1]

    name = client.backup_plan_revision_path(
        clean_project_id,
        clean_location_id,
        clean_backup_plan_id,
        clean_revision_id,
    )

    request = backupdr_v1beta.GetBackupPlanRevisionRequest(
        name=name,
    )

    try:
        response = client.get_backup_plan_revision(request=request)
        print(f"Retrieved backup plan revision: {response.name}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.InvalidArgument,
    ) as e:
        print(f"API call failed: {e}")
# [END backupdr_v1beta_backupdr_backupplanrevision_get]
