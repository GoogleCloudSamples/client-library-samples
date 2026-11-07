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

# [START bigtable_v2_bigtableinstanceadmin_memorylayers_list]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def list_memory_layers(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Lists memory layers for a Cloud Bigtable cluster.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Bigtable instance.
        cluster_id: The ID of the Cloud Bigtable cluster, or '-' to list across all clusters.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    parent = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        response = client.list_memory_layers(parent=parent)
        for memory_layer in response:
            print(f"Memory layer name: {memory_layer.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error listing memory layers: {e}")
# [END bigtable_v2_bigtableinstanceadmin_memorylayers_list]
