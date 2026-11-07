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

# [START dlp_v2_dlpservice_dlpjob_get]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def get_dlp_job(project_id: str, dlp_job_id: str) -> None:
    """Retrieve details of an existing Cloud DLP job.

    Args:
        project_id: The Google Cloud project ID.
        dlp_job_id: The ID of the DLP job to inspect.
    """
    name = f"projects/{project_id}/dlpJobs/{dlp_job_id}"

    request = dlp_v2.GetDlpJobRequest(
        name=name,
    )

    try:
        response = client.get_dlp_job(request=request)
        print(f"Job name: {response.name}")
        print(f"Job state: {response.state.name}")
        print(f"Job type: {response.type_.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dlp_v2_dlpservice_dlpjob_get]
