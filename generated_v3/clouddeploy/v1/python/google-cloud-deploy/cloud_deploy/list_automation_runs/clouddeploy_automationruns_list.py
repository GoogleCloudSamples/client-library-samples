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

# [START clouddeploy_v1_clouddeploy_automationruns_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import deploy_v1


def list_automation_runs(
    project_id: str, location_id: str, delivery_pipeline_id: str
) -> None:
    """Lists automation runs for a specified delivery pipeline.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        delivery_pipeline_id: The delivery pipeline ID (for example, 'example-deliverypipeline-id').
    """
    client = deploy_v1.CloudDeployClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"deliveryPipelines/{delivery_pipeline_id}"
    )

    request = deploy_v1.ListAutomationRunsRequest(
        parent=parent,
    )

    try:
        response = client.list_automation_runs(request=request)
        count = 0
        for automation_run in response:
            count += 1
            print(f"Automation run name: {automation_run.name}")
            print(f"Automation run state: {automation_run.state}")

        if count == 0:
            print("No automation runs found.")
    except GoogleAPICallError as error:
        print(f"Failed to list automation runs: {error}")


# [END clouddeploy_v1_clouddeploy_automationruns_list]
