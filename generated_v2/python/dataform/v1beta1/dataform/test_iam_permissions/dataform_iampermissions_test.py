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

# [START dataform_v1beta1_dataform_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1
from google.iam.v1 import iam_policy_pb2


def test_iam_permissions(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Test IAM permissions on a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, for example, us-central1.
        repository_id: The ID of the Dataform repository.
    """
    client = dataform_v1beta1.DataformClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )
    permissions = [
        "dataform.repositories.get",
        "dataform.repositories.update",
    ]

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource,
        permissions=permissions,
    )

    try:
        response = client.test_iam_permissions(request=request)
        print(f"Allowed permissions on {resource}:")
        for permission in response.permissions:
            print(f"- {permission}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test permissions: {error}")
# [END dataform_v1beta1_dataform_test_iam_permissions]
