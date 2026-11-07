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

# [START bigtable_v2_bigtableinstanceadmin_iampolicy_get]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def get_iam_policy(project_id: str, instance_id: str) -> None:
    """Retrieves the IAM policy for a Cloud Bigtable instance.

    Args:
        project_id: The ID of the Google Cloud project containing the Bigtable instance.
        instance_id: The ID of an existing Bigtable instance.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    resource = f"projects/{project_id}/instances/{instance_id}"

    try:
        response = client.get_iam_policy(request={"resource": resource})
        print(f"Policy version: {response.version}")
        for binding in response.bindings:
            print(f"Role: {binding.role}")
            print(f"Members: {', '.join(binding.members)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve IAM policy: {error}")
# [END bigtable_v2_bigtableinstanceadmin_iampolicy_get]
