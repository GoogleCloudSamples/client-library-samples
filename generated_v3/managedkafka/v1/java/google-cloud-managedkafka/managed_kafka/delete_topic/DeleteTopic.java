// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.managedkafka.v1;

// [START managedkafka_v1_managedkafka_topic_delete]
import com.google.cloud.managedkafka.v1.ManagedKafkaClient;
import com.google.cloud.managedkafka.v1.TopicName;

public class DeleteTopic {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String clusterId = "example-cluster_id";
    String topicId = "example-topic_id";
    deleteTopic(projectId, locationId, clusterId, topicId);
  }

  public static void deleteTopic(
      String projectId, String locationId, String clusterId, String topicId) throws Exception {
    try (ManagedKafkaClient client = ManagedKafkaClient.create()) {
      String name = TopicName.of(projectId, locationId, clusterId, topicId).toString();
      client.deleteTopic(name);
      System.out.println("Deleted topic: " + name);
    }
  }
}
// [END managedkafka_v1_managedkafka_topic_delete]
