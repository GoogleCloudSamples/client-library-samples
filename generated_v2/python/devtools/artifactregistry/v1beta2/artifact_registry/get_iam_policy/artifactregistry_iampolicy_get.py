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

# [START artifactregistry_v1beta2_artifactregistry_iampolicy_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_iam_policy(project_id: str, location_id: str, repository_id: str) -> None:
    """Retrieves the IAM policy for an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID containing the Artifact Registry repository.
        location_id: The regional location of the Artifact Registry repository (for example, us-central1).
        repository_id: The caller-specified identifier of the existing Artifact Registry repository.
    """
    resource = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    try:
        policy = client.get_iam_policy(request={"resource": resource})
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            for member in binding.members:
                print(f"  Member: {member}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END artifactregistry_v1beta2_artifactregistry_iampolicy_get]
