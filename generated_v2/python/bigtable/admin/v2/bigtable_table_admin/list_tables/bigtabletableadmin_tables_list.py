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

# [START bigtable_v2_bigtabletableadmin_tables_list]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import bigtable_admin_v2


def list_tables(project_id: str, instance_id: str) -> None:
    """Lists tables in an instance using the list_tables method.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: ID of the Instance (for example, 'example-instance-id').
    """
    client_options = ClientOptions(quota_project_id=project_id)
    client = bigtable_admin_v2.BigtableTableAdminClient(
        client_options=client_options
    )
    parent = f"projects/{project_id}/instances/{instance_id}"

    try:
        response = client.list_tables(parent=parent)
        for table in response:
            print(f"Table name: {table.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END bigtable_v2_bigtabletableadmin_tables_list]
