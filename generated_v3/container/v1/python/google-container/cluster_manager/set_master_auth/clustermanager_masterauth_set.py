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

# [START container_v1_clustermanager_set_master_auth]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import container_v1


def set_master_auth(project_id: str, location_id: str, cluster_id: str) -> None:
    """Disables basic authentication for a Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud compute region or zone for the cluster.
        cluster_id: The identifier of the cluster to update.
    """
    client = container_v1.ClusterManagerClient()

    # Basic authentication is unsupported on GKE >= 1.19; set an empty username to disable it.
    action = container_v1.SetMasterAuthRequest.Action.SET_USERNAME
    update = container_v1.MasterAuth(username="")
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    request = container_v1.SetMasterAuthRequest(
        name=name,
        action=action,
        update=update,
    )

    try:
        operation = client.set_master_auth(request=request)
        print(f"Operation name: {operation.name}")
        print(f"Operation status: {operation.status}")
    except GoogleAPICallError as error:
        print(f"Failed to set master auth: {error}")
# [END container_v1_clustermanager_set_master_auth]
