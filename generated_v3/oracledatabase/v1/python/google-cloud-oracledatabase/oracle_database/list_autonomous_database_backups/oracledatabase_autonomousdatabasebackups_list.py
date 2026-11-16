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

# [START oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def list_autonomous_database_backups(project_id: str, location_id: str) -> None:
    """List Autonomous Database backups in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Autonomous Database backups are located (for example, 'us-east4').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = oracledatabase_v1.ListAutonomousDatabaseBackupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_autonomous_database_backups(request=request)
        for backup in page_result:
            print(f"Backup Name: {backup.name}")
            print(f"Display Name: {backup.display_name}")
            print(f"Autonomous Database: {backup.autonomous_database}")
            print(f"State: {backup.lifecycle_state}")
    except google.api_core.exceptions.BadRequest as e:
        if "ENTITLEMENT_NOT_FOUND" in str(e):
            print("Listing backups requires an active marketplace order.")
        else:
            print(f"Request could not be processed: {e.message}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request could not be processed: {e.message}")
# [END oracledatabase_v1_oracledatabase_autonomousdatabasebackups_list]
