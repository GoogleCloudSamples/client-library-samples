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

# [START datacatalog_v1beta1_datacatalog_test_iam_permissions]
import google.api_core.exceptions
from google.cloud import datacatalog_v1beta1
from google.iam.v1 import iam_policy_pb2


def test_iam_permissions() -> None:
    """Test IAM permissions on a Data Catalog resource."""
    client = datacatalog_v1beta1.DataCatalogClient()

    project_id = "example-project-id"
    location = "us-central1"
    entry_group_id = "example-entry-group-id"

    resource = client.entry_group_path(project_id, location, entry_group_id)
    permissions = "datacatalog.entryGroups.get"

    request = iam_policy_pb2.TestIamPermissionsRequest(
        resource=resource,
        permissions=[permissions],
    )

    try:
        response = client.test_iam_permissions(request=request)
        print(f"Allowed permissions: {response.permissions}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to test IAM permissions: {error}")


# [END datacatalog_v1beta1_datacatalog_test_iam_permissions]
