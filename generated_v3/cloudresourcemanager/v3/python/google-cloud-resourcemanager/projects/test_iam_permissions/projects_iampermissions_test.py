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

# [START cloudresourcemanager_v3_projects_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3
from google.iam.v1 import iam_policy_pb2


def test_iam_permissions(project_id: str) -> None:
    """Tests IAM permissions on a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID on which to test permissions.
    """
    client = resourcemanager_v3.ProjectsClient()

    permissions = [
        "resourcemanager.projects.get",
        "resourcemanager.projects.update",
    ]
    resource = f"projects/{project_id}"

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource,
        permissions=permissions,
    )

    try:
        response = client.test_iam_permissions(request=request)
        print(f"Granted permissions for {resource}:")
        for permission in response.permissions:
            print(f"- {permission}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudresourcemanager_v3_projects_test_iam_permissions]
