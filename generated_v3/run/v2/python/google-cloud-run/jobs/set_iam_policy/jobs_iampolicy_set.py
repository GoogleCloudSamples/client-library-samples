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

# [START run_v2_jobs_set_iam_policy]
import google.api_core.exceptions
from google.cloud import run_v2
from google.iam.v1 import iam_policy_pb2
from google.iam.v1 import policy_pb2
from google.protobuf import field_mask_pb2

client = run_v2.JobsClient()


def set_iam_policy(project_id: str, location_id: str, job_id: str) -> None:
    """Use the set_iam_policy method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Cloud Run Job is located.
        job_id: The ID of the Cloud Run Job.
    """
    resource = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        # Retrieve existing policy to preserve etag and avoid concurrency conflicts
        current_policy = client.get_iam_policy(
            request=iam_policy_pb2.GetIamPolicyRequest(resource=resource)
        )

        new_binding = policy_pb2.Binding(
            role="roles/run.viewer",
            members=[
                f"serviceAccount:example-service-account@{project_id}.iam.gserviceaccount.com"
            ],
        )

        policy = policy_pb2.Policy(
            etag=current_policy.etag,
            bindings=list(current_policy.bindings) + [new_binding],
        )
        update_mask = field_mask_pb2.FieldMask(paths=["bindings"])

        request = iam_policy_pb2.SetIamPolicyRequest(
            resource=resource,
            policy=policy,
            update_mask=update_mask,
        )

        response = client.set_iam_policy(request=request)
        print(f"Updated IAM policy for {resource} with etag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to set IAM policy: {e}")
# [END run_v2_jobs_set_iam_policy]
