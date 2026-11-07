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

# [START datamigration_v1_datamigrationservice_backgroundjobs_search]
import google.api_core.exceptions
from google.cloud import clouddms_v1


def search_background_jobs(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Searches background jobs for a conversion workspace.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        conversion_workspace_id: ID of the ConversionWorkspace (for example, 'example-conversionworkspace-id').
    """
    client = clouddms_v1.DataMigrationServiceClient()

    conversion_workspace = (
        f"projects/{project_id}/locations/{location_id}/conversionWorkspaces/{conversion_workspace_id}"
    )

    request = clouddms_v1.SearchBackgroundJobsRequest(
        conversion_workspace=conversion_workspace,
        return_most_recent_per_job_type=True,
        max_size=100,
    )

    try:
        response = client.search_background_jobs(request=request)
        print(f"Background jobs found: {len(response.jobs)}")
        for job in response.jobs:
            print(
                f"Job ID: {job.id}, Type: {job.job_type}, State: {job.completion_state}"
            )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to search background jobs: {e}")
# [END datamigration_v1_datamigrationservice_backgroundjobs_search]
