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

# [START alloydb_v1alpha_alloydbadmin_clusters_list]
import google.api_core.exceptions
from google.cloud import alloydb_v1alpha

client = alloydb_v1alpha.AlloyDBAdminClient()


def list_clusters(project_id: str) -> None:
    """Lists AlloyDB clusters in a specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    try:
        response = client.list_clusters(parent=parent)
        for cluster in response:
            print(f"Cluster name: {cluster.name}")
            print(f"Cluster state: {cluster.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error occurred: {e}")


# [END alloydb_v1alpha_alloydbadmin_clusters_list]
