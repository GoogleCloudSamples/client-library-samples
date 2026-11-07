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

# [START dataflow_v1beta3_metricsv1beta3_jobexecutiondetails_get]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3


def get_job_execution_details(
    project_id: str, location_id: str, job_id: str
) -> None:
    """Retrieves execution details for a Cloud Dataflow job.

    Args:
        project_id: The ID of the Google Cloud project that contains the Dataflow job.
        location_id: The regional endpoint where the Dataflow job is running (for example, 'us-central1').
        job_id: The server-generated ID of the Dataflow job to retrieve execution details for.
    """
    client = dataflow_v1beta3.MetricsV1Beta3Client()

    try:
        request = dataflow_v1beta3.GetJobExecutionDetailsRequest(
            project_id=project_id,
            location=location_id,
            job_id=job_id,
        )
        response = client.get_job_execution_details(request=request)

        print(f"Retrieved execution details for job: {job_id}")
        has_stages = False
        for stage in response:
            has_stages = True
            print(f"Stage ID: {stage.stage_id}")
            print(f"Stage State: {stage.state.name}")

        if not has_stages:
            print("No stages found for this job.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve job execution details: {error}")
# [END dataflow_v1beta3_metricsv1beta3_jobexecutiondetails_get]
