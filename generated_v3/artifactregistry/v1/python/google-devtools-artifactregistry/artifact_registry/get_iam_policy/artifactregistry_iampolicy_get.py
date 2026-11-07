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

# [START artifactregistry_v1_artifactregistry_iampolicy_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1
from google.iam.v1 import iam_policy_pb2

client = artifactregistry_v1.ArtifactRegistryClient()


def get_iam_policy(project_id: str, location_id: str, repository_id: str) -> None:
    """Retrieve the IAM policy for an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location/region of the repository.
        repository_id: The ID or name of the repository.
    """
    resource = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = iam_policy_pb2.GetIamPolicyRequest(
        resource=resource,
    )

    try:
        policy = client.get_iam_policy(request=request)
        print(f"Policy retrieved successfully for {resource}:")
        print(f"Version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}, Members: {list(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve IAM policy: {e}")
# [END artifactregistry_v1_artifactregistry_iampolicy_get]
