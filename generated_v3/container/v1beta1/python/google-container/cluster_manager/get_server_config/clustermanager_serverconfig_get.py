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

# [START container_v1beta1_clustermanager_serverconfig_get]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def get_server_config(project_id: str, location_id: str) -> None:
    """Retrieve Google Kubernetes Engine server configuration for a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone to retrieve GKE server
            configuration for, such as 'us-central1' or 'us-central1-a'.
    """
    name = f"projects/{project_id}/locations/{location_id}"

    request = container_v1beta1.GetServerConfigRequest(name=name)

    try:
        response = client.get_server_config(request=request)
        print(f"Default cluster version: {response.default_cluster_version}")
        print(f"Default image type: {response.default_image_type}")
        print(f"Valid master versions: {list(response.valid_master_versions)}")
        print(f"Valid node versions: {list(response.valid_node_versions)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve server configuration: {e}")
# [END container_v1beta1_clustermanager_serverconfig_get]
