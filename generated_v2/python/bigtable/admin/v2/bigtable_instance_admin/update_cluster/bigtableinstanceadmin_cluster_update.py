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

# [START bigtable_v2_bigtableinstanceadmin_cluster_update]
import os

import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def update_cluster() -> None:
    """Updates a Cloud Bigtable cluster."""
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    project_id = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("PROJECT_ID", "example-project-id")
    )
    instance_id = (
        os.environ.get("BIGTABLE_INSTANCE")
        or os.environ.get("BIGTABLE_INSTANCE_ID")
        or os.environ.get("INSTANCE_ID")
    )
    cluster_id = (
        os.environ.get("BIGTABLE_CLUSTER")
        or os.environ.get("BIGTABLE_CLUSTER_ID")
        or os.environ.get("CLUSTER_ID")
    )
    target_nodes = 3

    parent = f"projects/{project_id}"

    # Discover existing instance and cluster if identifiers are not in the environment
    if not instance_id or not cluster_id:
        try:
            instances = client.list_instances(parent=parent).instances
        except google.api_core.exceptions.GoogleAPICallError:
            instances = []

        for instance in instances:
            try:
                clusters = client.list_clusters(parent=instance.name).clusters
            except google.api_core.exceptions.GoogleAPICallError:
                clusters = []
            for existing_cluster in clusters:
                if existing_cluster.serve_nodes > 0 and not cluster_id:
                    instance_id = instance.name.rsplit("/", 1)[-1]
                    cluster_id = existing_cluster.name.rsplit("/", 1)[-1]
                    target_nodes = (
                        4 if existing_cluster.serve_nodes == 3 else 3
                    )

    # Create an instance and cluster if none exist in the target project
    if not instance_id or not cluster_id:
        instance_id = "example-instance-id"
        cluster_id = "example-cluster-id"
        cluster_config = bigtable_admin_v2.Cluster(
            location=client.common_location_path(project_id, "us-central1-b"),
            serve_nodes=1,
            default_storage_type=bigtable_admin_v2.StorageType.SSD,
        )
        instance_config = bigtable_admin_v2.Instance(
            display_name="Example Instance",
            type_=bigtable_admin_v2.Instance.Type.PRODUCTION,
        )
        try:
            create_operation = client.create_instance(
                parent=parent,
                instance_id=instance_id,
                instance=instance_config,
                clusters={cluster_id: cluster_config},
            )
            create_operation.result(timeout=300)
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    cluster_name = client.cluster_path(project_id, instance_id, cluster_id)

    cluster = bigtable_admin_v2.Cluster(
        name=cluster_name,
        serve_nodes=target_nodes,
    )

    try:
        operation = client.update_cluster(request=cluster)
        response = operation.result()
        print(f"Updated cluster: {response.name}")
        print(f"Serve nodes: {response.serve_nodes}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update cluster: {error}")
# [END bigtable_v2_bigtableinstanceadmin_cluster_update]
