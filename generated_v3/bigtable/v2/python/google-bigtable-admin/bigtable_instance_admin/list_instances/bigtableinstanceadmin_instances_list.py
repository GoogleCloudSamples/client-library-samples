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

# [START bigtable_v2_bigtableinstanceadmin_instances_list]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def list_instances(project_id: str) -> None:
    """Lists Bigtable instances in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    parent = f"projects/{project_id}"

    try:
        response = client.list_instances(parent=parent)
        for instance in response.instances:
            print(f"Instance name: {instance.name}")
            print(f"Display name: {instance.display_name}")
            print(f"State: {instance.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END bigtable_v2_bigtableinstanceadmin_instances_list]
