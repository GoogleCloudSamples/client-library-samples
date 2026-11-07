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

# [START cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
from google.api_core import exceptions
from google.cloud import tasks_v2beta3


def test_iam_permissions(project_id: str, location_id: str, queue_id: str) -> None:
    """Tests IAM permissions for a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the queue is located (for
          example, 'us-central1').
        queue_id: The ID of the existing queue to test permissions for.
    """
    client = tasks_v2beta3.CloudTasksClient()

    resource = f"projects/{project_id}/locations/{location_id}/queues/{queue_id}"
    permissions = ["cloudtasks.queues.get", "cloudtasks.queues.getIamPolicy"]

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Allowed permissions: {response.permissions}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error testing IAM permissions: {error}")


# [END cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
