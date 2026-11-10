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

# [START backupdr_list_backup_plan_associations]
import google.api_core.exceptions
from google.cloud import backupdr_v1


def list_backup_plan_associations(project_id: str, location_id: str) -> None:
    """List backup plan associations in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = backupdr_v1.BackupDRClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_backup_plan_associations(parent=parent)
        count = 0
        for association in response:
            print(f"Association: {association.name}")
            print(f"Resource: {association.resource}")
            print(f"Backup Plan: {association.backup_plan}")
            count += 1

        if count == 0:
            print("No backup plan associations found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error listing backup plan associations: {e}")
# [END backupdr_list_backup_plan_associations]
