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

# [START bigtable_v2_bigtableinstanceadmin_memorylayer_get]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def get_memory_layer(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Gets the details of a Cloud Bigtable cluster memory layer.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The caller-chosen ID of the Bigtable instance (for example, 'example-instance').
        cluster_id: The caller-chosen ID of the Bigtable cluster (for example, 'example-cluster').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    name = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}/memoryLayer"

    try:
        response = client.get_memory_layer(name=name)
        print(f"Memory layer name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve memory layer: {error}")
# [END bigtable_v2_bigtableinstanceadmin_memorylayer_get]
