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

# [START batch_list_jobs]
import google.api_core.exceptions
from google.cloud import batch_v1


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Batch jobs in a specified Google Cloud location.

    Args:
        project_id: The Google Cloud project ID hosting the Batch jobs.
        location_id: The Google Cloud region where the Batch jobs reside (for
          example, 'us-central1').
    """
    client = batch_v1.BatchServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_jobs(parent=parent)

        for job in response:
            print(job.name)
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list jobs: {error}")


# [END batch_list_jobs]
