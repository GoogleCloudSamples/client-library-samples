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

# [START backupdr_v1beta_backupdr_fetch_backup_plan_associations_for_resource_type]
import google.api_core.exceptions
from google.cloud import backupdr_v1beta


def fetch_backup_plan_associations_for_resource_type(
    project_id: str, location_id: str
) -> None:
    """Fetches backup plan associations for a specific resource type.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = backupdr_v1beta.BackupDRClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    resource_type = "compute.googleapis.com/Instance"

    request = backupdr_v1beta.FetchBackupPlanAssociationsForResourceTypeRequest(
        parent=parent,
        resource_type=resource_type,
    )

    try:
        response = client.fetch_backup_plan_associations_for_resource_type(
            request=request
        )
        associations_found = False
        for association in response:
            print(f"Backup plan association: {association.name}")
            associations_found = True

        if not associations_found:
            print(
                f"No backup plan associations found for resource type: {resource_type}"
            )
    except google.api_core.exceptions.GoogleAPIError as exception:
        print(f"Failed to fetch backup plan associations: {exception}")


# [END backupdr_v1beta_backupdr_fetch_backup_plan_associations_for_resource_type]
