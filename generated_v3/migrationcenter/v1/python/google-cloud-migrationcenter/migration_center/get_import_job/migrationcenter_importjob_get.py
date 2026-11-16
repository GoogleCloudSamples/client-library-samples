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

# [START migrationcenter_v1_migrationcenter_importjob_get]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def get_import_job(project_id: str, location_id: str, import_job_id: str) -> None:
    """Retrieves details of an existing import job.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region.
        import_job_id: The ID of the import job.
    """
    name = f"projects/{project_id}/locations/{location_id}/importJobs/{import_job_id}"

    request = migrationcenter_v1.GetImportJobRequest(name=name)

    try:
        response = client.get_import_job(request=request)
        print(f"Retrieved import job: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve import job: {error.message}")


# [END migrationcenter_v1_migrationcenter_importjob_get]
