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

# [START run_v2_services_iampolicy_get]
import os

import google.api_core.exceptions
from google.cloud import run_v2
from google.iam.v1 import iam_policy_pb2


def get_iam_policy() -> None:
    """Get the IAM access control policy for a Cloud Run service."""
    project_id = (
        os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("PROJECT_ID")
        or "example-project"
    )
    location = os.getenv("GOOGLE_CLOUD_REGION", "us-central1")
    service_id = os.getenv("CLOUD_RUN_SERVICE", "example-service")
    resource = f"projects/{project_id}/locations/{location}/services/{service_id}"

    client = run_v2.ServicesClient()
    request = iam_policy_pb2.GetIamPolicyRequest(resource=resource)

    try:
        policy = client.get_iam_policy(request=request)
        print(f"Retrieved IAM policy for {resource}:")
        for binding in policy.bindings:
            print(f"Role: {binding.role}, Members: {', '.join(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve IAM policy: {e}")
# [END run_v2_services_iampolicy_get]
