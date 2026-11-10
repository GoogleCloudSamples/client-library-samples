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

# [START bigtable_v2_bigtableinstanceadmin_instance_delete]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def delete_instance(project_id: str, instance_id: str) -> None:
    """Deletes an existing Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Bigtable instance to delete.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    name = f"projects/{project_id}/instances/{instance_id}"

    try:
        # Delete the specified instance permanently.
        client.delete_instance(name=name)
        print(f"Deleted instance: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call error: {e}")


# [END bigtable_v2_bigtableinstanceadmin_instance_delete]
