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

# [START container_v1_clustermanager_set_addons_config]
import time

import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def set_addons_config(project_id: str, location_id: str, cluster_id: str) -> None:
    """Updates the addons configuration for a specified Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone of the cluster (for
          example, 'us-central1' or 'us-central1-a').
        cluster_id: The name or ID of the cluster.
    """
    cluster_name = (
        f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"
    )

    try:
        # Retrieve the current cluster configuration to perform a full replacement update.
        cluster = client.get_cluster(name=cluster_name)
        addons_config = cluster.addons_config
        addons_config.dns_cache_config.enabled = True

        request = container_v1.SetAddonsConfigRequest(
            name=cluster_name,
            addons_config=addons_config,
        )
        operation = client.set_addons_config(request=request)

        op_name = (
            operation.name
            if operation.name.startswith("projects/")
            else f"projects/{project_id}/locations/{location_id}/operations/{operation.name}"
        )

        while operation.status != container_v1.Operation.Status.DONE:
            time.sleep(5)
            operation = client.get_operation(name=op_name)

        print(f"Updated addons configuration for cluster: {cluster_id}")
        print(f"Operation completed with status: {operation.status}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update addons configuration: {e}")
# [END container_v1_clustermanager_set_addons_config]
