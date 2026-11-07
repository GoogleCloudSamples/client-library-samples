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

# [START datamigration_v1_datamigrationservice_migrationjobs_list]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def list_migration_jobs(project_id: str, location_id: str) -> None:
    """Lists migration jobs in a project and location.

    Args:
        project_id: The Google Cloud project ID hosting the migration jobs.
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = clouddms_v1.ListMigrationJobsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_migration_jobs(request=request)
        count = 0
        for migration_job in page_result:
            print(f"Migration job: {migration_job.name}")
            count += 1
        if count == 0:
            print(f"No migration jobs found in {parent}.")
        else:
            print(f"Total migration jobs: {count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list migration jobs: {error}")
# [END datamigration_v1_datamigrationservice_migrationjobs_list]
