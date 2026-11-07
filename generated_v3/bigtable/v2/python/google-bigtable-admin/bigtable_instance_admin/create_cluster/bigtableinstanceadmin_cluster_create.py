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

# [START bigtable_v2_bigtableinstanceadmin_cluster_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2

client = bigtable_admin_v2.BigtableInstanceAdminClient()


def create_cluster(
    project_id: str, instance_id: str, cluster_id: str, zone_id: str
) -> None:
    """Creates a cluster within a Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the parent Bigtable instance (for example, 'example-instance').
        cluster_id: The ID to use for the new cluster (for example, 'example-cluster').
        zone_id: The Google Cloud zone where the cluster is located (for example, 'us-central1-b').
    """
    parent = f"projects/{project_id}/instances/{instance_id}"
    cluster = bigtable_admin_v2.Cluster(
        location=f"projects/{project_id}/locations/{zone_id}",
        serve_nodes=1,
        default_storage_type=bigtable_admin_v2.StorageType.SSD,
    )

    try:
        operation = client.create_cluster(
            parent=parent,
            cluster_id=cluster_id,
            cluster=cluster,
        )
        response = operation.result()
        print(f"Created cluster: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create cluster: {e}")
# [END bigtable_v2_bigtableinstanceadmin_cluster_create]
