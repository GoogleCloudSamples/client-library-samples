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

# [START run_v2_workerpools_set_iam_policy]
import google.api_core.exceptions
from google.cloud import run_v2
from google.iam.v1 import iam_policy_pb2, policy_pb2
from google.protobuf import field_mask_pb2

client = run_v2.WorkerPoolsClient()


def set_iam_policy(project_id: str, location_id: str, worker_pool_id: str) -> None:
    """Sets the IAM policy for a WorkerPool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for the WorkerPool.
        worker_pool_id: The unique identifier of the WorkerPool.
    """
    resource = (
        f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"
    )
    policy = policy_pb2.Policy(
        bindings=[
            policy_pb2.Binding(
                role="roles/run.viewer",
                members=[
                    f"serviceAccount:example-sa@{project_id}.iam.gserviceaccount.com"
                ],
            )
        ]
    )
    update_mask = field_mask_pb2.FieldMask(paths=["bindings"])

    request = iam_policy_pb2.SetIamPolicyRequest(
        resource=resource,
        policy=policy,
        update_mask=update_mask,
    )

    try:
        response = client.set_iam_policy(request=request)
        print(f"Policy successfully set for resource: {resource}")
        print(f"ETag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to set IAM policy: {error}")
# [END run_v2_workerpools_set_iam_policy]
