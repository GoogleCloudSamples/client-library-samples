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

# [START bigtable_v2_bigtabletableadmin_check_consistency]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def check_consistency(
    project_id: str, instance_id: str, table_id: str, consistency_token: str
) -> None:
    """Checks replication consistency for a Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Bigtable instance.
        table_id: The ID of the Bigtable table.
        consistency_token: The replication consistency token previously generated for the table.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()

    name = f"projects/{project_id}/instances/{instance_id}/tables/{table_id}"

    request = bigtable_admin_v2.CheckConsistencyRequest(
        name=name,
        consistency_token=consistency_token,
    )

    try:
        response = client.check_consistency(request=request)
        print(f"Table replication consistency status: {response.consistent}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END bigtable_v2_bigtabletableadmin_check_consistency]
