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

# [START dlp_v2_dlpservice_jobtrigger_create]
import google.api_core.exceptions
from google.cloud import dlp_v2
from google.protobuf import duration_pb2

client = dlp_v2.DlpServiceClient()


def create_job_trigger(project_id: str, trigger_id: str) -> None:
    """Use the create_job_trigger method to create a scheduled scan trigger.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        trigger_id: The caller-specified ID of the job trigger to create. If omitted, the server assigns a random ID. Must match '[a-zA-Z0-9-_]+' and be at most 100 characters.
    """
    parent = f"projects/{project_id}"

    # Configure scheduled recurrence duration to run at least once every 24 hours
    schedule = dlp_v2.Schedule(
        recurrence_period_duration=duration_pb2.Duration(seconds=86400)
    )
    trigger = dlp_v2.JobTrigger.Trigger(schedule=schedule)

    # Configure the inspection rules and scan target
    inspect_config = dlp_v2.InspectConfig(
        info_types=[dlp_v2.InfoType(name="PERSON_NAME")],
        min_likelihood=dlp_v2.Likelihood.LIKELY,
    )
    storage_config = dlp_v2.StorageConfig(
        cloud_storage_options=dlp_v2.CloudStorageOptions(
            file_set=dlp_v2.CloudStorageOptions.FileSet(
                url="gs://example-bucket/*.csv"
            )
        )
    )
    inspect_job = dlp_v2.InspectJobConfig(
        inspect_config=inspect_config,
        storage_config=storage_config,
    )

    job_trigger = dlp_v2.JobTrigger(
        display_name="Example Scheduled Scan",
        description="Daily scan for sensitive data",
        status=dlp_v2.JobTrigger.Status.HEALTHY,
        triggers=[trigger],
        inspect_job=inspect_job,
    )

    try:
        response = client.create_job_trigger(
            request={
                "parent": parent,
                "job_trigger": job_trigger,
                "trigger_id": trigger_id,
            }
        )
        print(f"Successfully created job trigger: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dlp_v2_dlpservice_jobtrigger_create]
