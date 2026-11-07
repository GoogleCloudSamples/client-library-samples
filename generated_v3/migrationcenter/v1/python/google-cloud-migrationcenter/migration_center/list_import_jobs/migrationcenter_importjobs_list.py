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

# [START migrationcenter_v1_migrationcenter_importjobs_list]
import os

import google.api_core.exceptions
from google.cloud import migrationcenter_v1


def list_import_jobs() -> None:
    """Lists import jobs in a specified project and location."""
    client = migrationcenter_v1.MigrationCenterClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    request = migrationcenter_v1.ListImportJobsRequest(
        parent=parent,
    )

    try:
        response = client.list_import_jobs(request=request)
        for import_job in response:
            print(f"Import job: {import_job.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")


# [END migrationcenter_v1_migrationcenter_importjobs_list]
