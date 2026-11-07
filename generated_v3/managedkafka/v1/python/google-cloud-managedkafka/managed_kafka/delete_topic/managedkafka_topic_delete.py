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

# [START managedkafka_v1_managedkafka_topic_delete]
import google.api_core.exceptions
from google.cloud import managedkafka_v1

client = managedkafka_v1.ManagedKafkaClient()


def delete_topic(
    project_id: str, location_id: str, cluster_id: str, topic_id: str
) -> None:
    """Deletes an Apache Kafka topic from a cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        cluster_id: ID of the cluster (for example, 'example-cluster-id').
        topic_id: ID of the topic (for example, 'example-topic-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}/topics/{topic_id}"

    try:
        client.delete_topic(name=name)
        print(f"Deleted topic: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete topic: {error}")
# [END managedkafka_v1_managedkafka_topic_delete]
