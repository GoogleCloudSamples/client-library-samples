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

# [START dataflow_v1beta3_jobsv1beta3_jobs_list]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3

client = dataflow_v1beta3.JobsV1Beta3Client()


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Dataflow jobs in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region containing the Dataflow jobs.
    """
    request = dataflow_v1beta3.ListJobsRequest(
        project_id=project_id,
        location=location_id,
    )

    try:
        response = client.list_jobs(request=request)
        for job in response:
            print(f"Job ID: {job.id}")
            print(f"Job Name: {job.name}")
            print(f"Current State: {job.current_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dataflow_v1beta3_jobsv1beta3_jobs_list]
