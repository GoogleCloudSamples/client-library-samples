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

# [START managedkafka_v1_managedkafkaconnect_connectclusters_list]
import google.api_core.exceptions
from google.cloud import managedkafka_v1


def list_connect_clusters(project_id: str, location_id: str) -> None:
    """Lists Managed Service for Apache Kafka Connect clusters in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = managedkafka_v1.ManagedKafkaConnectClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = managedkafka_v1.ListConnectClustersRequest(parent=parent)

    try:
        response = client.list_connect_clusters(request=request)
        cluster_found = False
        for cluster in response:
            print(f"Connect cluster name: {cluster.name}")
            cluster_found = True
        if not cluster_found:
            print(f"No Connect clusters found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Connect clusters: {error}")
# [END managedkafka_v1_managedkafkaconnect_connectclusters_list]
