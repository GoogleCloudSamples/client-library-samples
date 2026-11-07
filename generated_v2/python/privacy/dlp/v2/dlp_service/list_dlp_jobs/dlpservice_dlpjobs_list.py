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

# [START dlp_v2_dlpservice_dlpjobs_list]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def list_dlp_jobs(project_id: str) -> None:
    """Lists Sensitive Data Protection jobs in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to list DLP jobs for.
    """
    parent = f"projects/{project_id}"

    request = dlp_v2.ListDlpJobsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_dlp_jobs(request=request)
        for job in page_result:
            print(f"Job name: {job.name}")
            print(f"Job state: {job.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list DLP jobs: {error}")
# [END dlp_v2_dlpservice_dlpjobs_list]
