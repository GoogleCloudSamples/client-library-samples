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

# [START container_v1beta1_clustermanager_usablesubnetworks_list]
import google.api_core.exceptions
from google.cloud import container_v1beta1


def list_usable_subnetworks(project_id: str) -> None:
    """Lists usable subnetworks for cluster creation in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = container_v1beta1.ClusterManagerClient()
    parent = f"projects/{project_id}"

    request = container_v1beta1.ListUsableSubnetworksRequest(
        parent=parent,
    )

    try:
        response = client.list_usable_subnetworks(request=request)
        for subnetwork in response:
            print(f"Subnetwork: {subnetwork.subnetwork}")
            print(f"Network: {subnetwork.network}")
            print(f"Secondary ranges: {len(subnetwork.secondary_ip_ranges)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END container_v1beta1_clustermanager_usablesubnetworks_list]
