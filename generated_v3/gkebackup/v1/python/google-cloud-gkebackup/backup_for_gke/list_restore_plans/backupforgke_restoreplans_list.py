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

# [START gke_backup_v1_backupforgke_restoreplans_list]
from google.api_core import exceptions
from google.cloud import gke_backup_v1


def list_restore_plans(project_id: str, location_id: str) -> None:
    """Lists restore plans in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = gke_backup_v1.BackupForGKEClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_restore_plans(parent=parent)

        print(f"Restore plans in {parent}:")
        count = 0
        for restore_plan in response:
            print(f"Name: {restore_plan.name}")
            print(f"Cluster: {restore_plan.cluster}")
            count += 1

        if count == 0:
            print("No restore plans found.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list restore plans: {e}")


# [END gke_backup_v1_backupforgke_restoreplans_list]
