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

# [START cloudscheduler_list_jobs]
from google.api_core import exceptions
from google.cloud import scheduler_v1beta1


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Cloud Scheduler jobs in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = scheduler_v1.CloudSchedulerClient()
    parent = client.common_location_path(project_id, location_id)

    try:
        response = client.list_jobs(parent=parent)

        for job in response:
            print(f"Job name: {job.name}")
            print(f"Schedule: {job.schedule}")
            print(f"State: {job.state}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list jobs: {error}")
# [END cloudscheduler_list_jobs]
