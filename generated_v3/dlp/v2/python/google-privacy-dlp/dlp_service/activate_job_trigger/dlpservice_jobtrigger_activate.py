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

# [START dlp_v2_dlpservice_activate_job_trigger]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def activate_job_trigger(project_id: str, job_trigger_id: str) -> None:
    """Activate an existing Cloud DLP job trigger to start scanning immediately.

    Args:
        project_id: The Google Cloud project ID containing the job trigger.
        job_trigger_id: The ID of the JobTrigger to activate. This may be
          caller-specified or server-generated; obtain it from an existing
          JobTrigger resource or ListJobTriggers response.
    """
    name = f"projects/{project_id}/jobTriggers/{job_trigger_id}"

    request = dlp_v2.ActivateJobTriggerRequest(
        name=name,
    )

    try:
        response = client.activate_job_trigger(request=request)
        print(f"Activated job trigger successfully: {response.name}")
        print(f"Job state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error activating job trigger: {e.message}")
# [END dlp_v2_dlpservice_activate_job_trigger]
