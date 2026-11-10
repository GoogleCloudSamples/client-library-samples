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

# [START bigtable_v2_bigtableinstanceadmin_cluster_get]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def get_cluster(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Retrieves an existing Bigtable cluster.

    Args:
        project_id: The Google Cloud project ID containing the Bigtable instance.
        instance_id: The ID of the Bigtable instance containing the cluster.
        cluster_id: The ID of the Bigtable cluster to retrieve.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    name = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        cluster = client.get_cluster(name=name)
        print(f"Cluster retrieved: {cluster.name}")
        print(f"Location: {cluster.location}")
        print(f"State: {cluster.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END bigtable_v2_bigtableinstanceadmin_cluster_get]
