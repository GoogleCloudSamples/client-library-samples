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

# [START dlp_v2_dlpservice_jobtrigger_update]
import google.api_core.exceptions
from google.cloud import dlp_v2
from google.protobuf import field_mask_pb2

client = dlp_v2.DlpServiceClient()


def update_job_trigger(project_id: str, job_trigger_id: str) -> None:
    """Use the update_job_trigger method

    Args:
        project_id: The Google Cloud project ID.
        job_trigger_id: The ID of the DLP job trigger to update.
    """
    name = f"projects/{project_id}/jobTriggers/{job_trigger_id}"
    job_trigger = dlp_v2.JobTrigger(description="Updated job trigger description")
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_job_trigger(
            request={
                "name": name,
                "job_trigger": job_trigger,
                "update_mask": update_mask,
            }
        )
        print(f"Updated job trigger: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update job trigger: {error}")


# [END dlp_v2_dlpservice_jobtrigger_update]
