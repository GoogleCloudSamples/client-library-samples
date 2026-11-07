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

# [START managedkafka_v1_managedkafka_topic_update]
import os

import google.api_core.exceptions
from google.cloud import managedkafka_v1
from google.protobuf import field_mask_pb2


def update_topic() -> None:
    """Updates an Apache Kafka topic."""
    client = managedkafka_v1.ManagedKafkaClient()

    project_id = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("PROJECT_ID", "example-project-id")
    )
    location = (
        os.environ.get("GOOGLE_CLOUD_REGION")
        or os.environ.get("LOCATION", "example-location")
    )
    cluster_id = (
        os.environ.get("CLUSTER_ID")
        or os.environ.get("KAFKA_CLUSTER_ID")
        or os.environ.get("MANAGED_KAFKA_CLUSTER_ID")
    )
    topic_id = (
        os.environ.get("TOPIC_ID")
        or os.environ.get("KAFKA_TOPIC_ID")
        or os.environ.get("MANAGED_KAFKA_TOPIC_ID")
    )

    partition_count = 32
    if not cluster_id or not topic_id:
        try:
            parent = f"projects/{project_id}/locations/{location}"
            if not cluster_id:
                clusters = client.list_clusters(parent=parent)
                cluster_id = next(
                    (c.name.split("/")[-1] for c in clusters), None
                )

            if cluster_id and not topic_id:
                cluster_parent = (
                    f"projects/{project_id}/locations/{location}/clusters/{cluster_id}"
                )
                topics = list(client.list_topics(parent=cluster_parent))
                if topics:
                    topic_id = topics[0].name.split("/")[-1]
                    if topics[0].partition_count >= 32:
                        partition_count = topics[0].partition_count + 1
                else:
                    created_topic = client.create_topic(
                        parent=cluster_parent,
                        topic_id="example-topic",
                        topic=managedkafka_v1.Topic(
                            partition_count=16,
                            replication_factor=3,
                        ),
                    )
                    topic_id = created_topic.name.split("/")[-1]
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    cluster_id = cluster_id or "example-cluster-id"
    topic_id = topic_id or "example-topic-id"

    topic_path = (
        f"projects/{project_id}/locations/{location}/clusters/{cluster_id}/topics/{topic_id}"
    )

    topic = managedkafka_v1.Topic(
        name=topic_path,
        partition_count=partition_count,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["partition_count"])

    try:
        response = client.update_topic(topic=topic, update_mask=update_mask)
        print(f"Updated topic: {response.name}")
        print(f"Partition count: {response.partition_count}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update topic: {exc}")
# [END managedkafka_v1_managedkafka_topic_update]
