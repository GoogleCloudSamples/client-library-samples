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

# [START dlp_v2_dlpservice_jobtrigger_get]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def get_job_trigger(project_id: str, job_trigger_id: str) -> None:
    """Use the get_job_trigger method.

    Args:
        project_id: The Google Cloud project ID.
        job_trigger_id: The ID of the job trigger to retrieve. Can be
          user-specified or server-generated (for example, read from
          CreateJobTrigger or ListJobTriggers).
    """
    name = f"projects/{project_id}/jobTriggers/{job_trigger_id}"

    request = dlp_v2.GetJobTriggerRequest(
        name=name,
    )

    try:
        response = client.get_job_trigger(request=request)
        print(f"Successfully retrieved job trigger: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"Status: {response.status.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving job trigger: {error}")


# [END dlp_v2_dlpservice_jobtrigger_get]
