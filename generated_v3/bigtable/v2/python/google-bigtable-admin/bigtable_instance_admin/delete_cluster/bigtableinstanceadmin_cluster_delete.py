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

# [START bigtable_v2_bigtableinstanceadmin_cluster_delete]
from google.api_core import exceptions
from google.cloud import bigtable_admin_v2


def delete_cluster(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Deletes a cluster from a Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID hosting the Bigtable instance.
        instance_id: The ID of the Bigtable instance containing the cluster.
        cluster_id: The ID of the Bigtable cluster to delete.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    name = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        client.delete_cluster(name=name)
        print(f"Deleted cluster: {name}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete cluster: {exc}")
# [END bigtable_v2_bigtableinstanceadmin_cluster_delete]
