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

# [START dlp_v2_dlpservice_jobtrigger_delete]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def delete_job_trigger(project_id: str, job_trigger_id: str) -> None:
    """Deletes an existing Cloud Data Loss Prevention (DLP) job trigger.

    Args:
        project_id: The Google Cloud project ID where the job trigger is located.
        job_trigger_id: The ID of the DLP job trigger to delete.
    """
    # Construct the resource name for the target job trigger
    name = f"projects/{project_id}/jobTriggers/{job_trigger_id}"

    try:
        client.delete_job_trigger(name=name)
        print(f"Successfully deleted job trigger: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Job trigger {name} does not exist.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed while deleting job trigger: {error}")
# [END dlp_v2_dlpservice_jobtrigger_delete]
