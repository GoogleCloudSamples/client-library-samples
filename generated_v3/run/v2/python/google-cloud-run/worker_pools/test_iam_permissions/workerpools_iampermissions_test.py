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

# [START run_v2_workerpools_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import run_v2
from google.iam.v1 import iam_policy_pb2


def test_iam_permissions(
    project_id: str, location_id: str, worker_pool_id: str
) -> None:
    """Test IAM permissions on a Cloud Run WorkerPool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the WorkerPool resides (for
          example, 'us-central1').
        worker_pool_id: The identifier of the Cloud Run WorkerPool.
    """
    client = run_v2.WorkerPoolsClient()

    resource = f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"
    permissions = ["run.workerpools.get", "run.workerpools.update"]

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource,
        permissions=permissions,
    )

    try:
        response = client.test_iam_permissions(request=request)
        print(f"Allowed permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to test IAM permissions: {e}")
# [END run_v2_workerpools_test_iam_permissions]
