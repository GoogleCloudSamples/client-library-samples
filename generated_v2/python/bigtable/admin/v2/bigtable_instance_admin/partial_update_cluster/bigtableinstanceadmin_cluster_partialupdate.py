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

# [START bigtable_v2_bigtableinstanceadmin_partial_update_cluster]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2
from google.protobuf import field_mask_pb2

client = bigtable_admin_v2.BigtableInstanceAdminClient()


def partial_update_cluster(
    project_id: str, instance_id: str, cluster_id: str
) -> None:
    """Updates the number of nodes in a Bigtable cluster.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Bigtable instance.
        cluster_id: The ID of the Bigtable cluster to update.
    """
    cluster = bigtable_admin_v2.Cluster(
        name=f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}",
        serve_nodes=3,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["serve_nodes"])

    try:
        operation = client.partial_update_cluster(
            cluster=cluster,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated cluster: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Cluster update failed: {e}")
# [END bigtable_v2_bigtableinstanceadmin_partial_update_cluster]
