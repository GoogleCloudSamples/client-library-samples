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

# [START bigtable_v2_bigtableinstanceadmin_test_iam_permissions]
from google.api_core import exceptions
from google.cloud import bigtable_admin_v2


def test_iam_permissions(project_id: str, instance_id: str) -> None:
    """Tests IAM permissions on a Bigtable instance.

    Args:
        project_id: The Google Cloud project ID containing the Bigtable instance.
        instance_id: The ID of an existing Bigtable instance.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    permissions = ["bigtable.instances.get", "bigtable.instances.update"]
    resource = f"projects/{project_id}/instances/{instance_id}"

    try:
        response = client.test_iam_permissions(
            resource=resource,
            permissions=permissions,
        )
        print(f"Allowed permissions: {response.permissions}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to test IAM permissions: {e}")
# [END bigtable_v2_bigtableinstanceadmin_test_iam_permissions]
