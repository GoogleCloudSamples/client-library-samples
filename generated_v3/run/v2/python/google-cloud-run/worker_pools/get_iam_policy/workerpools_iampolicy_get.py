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

# [START run_v2_workerpools_iampolicy_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.WorkerPoolsClient()


def get_iam_policy(project_id: str, location_id: str, worker_pool_id: str) -> None:
    """Gets the IAM access control policy for a Cloud Run WorkerPool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the WorkerPool resides.
        worker_pool_id: The user-defined identifier of the WorkerPool.
    """
    resource = (
        f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"
    )

    try:
        response = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for: {resource}")
        print(f"Policy version: {response.version}")
        for binding in response.bindings:
            print(f"Role: {binding.role}, Members: {list(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve IAM policy: {e}")
# [END run_v2_workerpools_iampolicy_get]
