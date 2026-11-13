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

# [START run_v2_jobs_iampolicy_get]
import google.api_core.exceptions
from google.cloud import run_v2
from google.iam.v1 import iam_policy_pb2

client = run_v2.JobsClient()


def get_iam_policy(project_id: str, location_id: str, job_id: str) -> None:
    """Use the get_iam_policy method

    Args:
        project_id: The Google Cloud project identifier.
        location_id: The Google Cloud region where the Cloud Run Job is located.
        job_id: The identifier of the Cloud Run Job.
    """
    resource = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    request = iam_policy_pb2.GetIamPolicyRequest(
        resource=resource,
    )

    try:
        policy = client.get_iam_policy(request=request)
        print(f"Retrieved IAM policy for {resource}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}, Members: {', '.join(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get IAM policy: {e}")
# [END run_v2_jobs_iampolicy_get]
