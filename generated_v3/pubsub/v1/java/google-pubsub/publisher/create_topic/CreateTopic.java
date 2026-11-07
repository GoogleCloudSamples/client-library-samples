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

package com.google.cloud.pubsub.v1;

// [START pubsub_v1_publisher_topic_create]
import com.google.cloud.pubsub.v1.TopicAdminClient;
import com.google.pubsub.v1.Topic;
import com.google.pubsub.v1.TopicName;

public class CreateTopic {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String topicId = "example-topic_id";
    createTopic(projectId, topicId);
  }

  public static void createTopic(String projectId, String topicId) throws Exception {
    try (TopicAdminClient client = TopicAdminClient.create()) {
      String name = TopicName.of(projectId, topicId).toString();
      Topic topic = client.createTopic(name);
      System.out.println("Created topic: " + topic.getName());
    }
  }
}
// [END pubsub_v1_publisher_topic_create]
