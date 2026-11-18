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

# [START managedkafka_v1_managedkafka_acl_get]
import google.api_core.exceptions
from google.cloud import managedkafka_v1

client = managedkafka_v1.ManagedKafkaClient()


def get_acl(project_id: str, location_id: str, cluster_id: str, acl_id: str) -> None:
    """Retrieves an Access Control List (ACL) from an Apache Kafka cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Kafka cluster is located (for example, 'us-central1').
        cluster_id: The ID of the Kafka cluster (for example, 'example-cluster').
        acl_id: The resource pattern identifier for the ACL (for example, 'allTopics', 'cluster', or 'topic/example-topic').
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}/acls/{acl_id}"

    request = managedkafka_v1.GetAclRequest(
        name=name,
    )

    try:
        response = client.get_acl(request=request)
        print(f"Retrieved ACL: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get ACL: {e}")
# [END managedkafka_v1_managedkafka_acl_get]
