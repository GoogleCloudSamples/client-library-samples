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

# [START artifactregistry_v1beta2_artifactregistry_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2


def test_iam_permissions(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Tests IAM permissions on an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for
          example, "us-central1").
        repository_id: The Artifact Registry repository ID.
    """
    client = artifactregistry_v1beta2.ArtifactRegistryClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )
    permissions = [
        "artifactregistry.repositories.get",
        "artifactregistry.repositories.getIamPolicy",
    ]

    try:
        response = client.test_iam_permissions(
            request={
                "resource": resource,
                "permissions": permissions,
            }
        )
        print(f"Allowed permissions for {resource}:")
        for permission in response.permissions:
            print(f"- {permission}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test permissions: {error}")


# [END artifactregistry_v1beta2_artifactregistry_test_iam_permissions]
