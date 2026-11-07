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

# [START batch_v1alpha_batchservice_jobs_list]
import google.api_core.exceptions
from google.cloud import batch_v1alpha

client = batch_v1alpha.BatchServiceClient()


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Batch jobs in the specified location.

    Args:
        project_id: The Google Cloud project ID or project number.
        location_id: The Google Cloud region, for example, 'us-central1'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = batch_v1alpha.ListJobsRequest(
        parent=parent,
    )

    try:
        response = client.list_jobs(request=request)
        for job in response:
            print(f"Job: {job.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END batch_v1alpha_batchservice_jobs_list]
