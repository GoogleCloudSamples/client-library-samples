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

// [START pubsub_v1_publisher_publish]
import com.google.cloud.pubsub.v1.TopicAdminClient;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PublishRequest;
import com.google.pubsub.v1.PublishResponse;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.TopicName;
import java.io.IOException;

public class Publish {

  public static void main(String[] args) throws IOException {
    if (args.length < 2) {
      System.err.println("Usage: Publish <projectId> <topicId>");
      return;
    }
    String projectId = args[0];
    String topicId = args[1];
    publish(projectId, topicId);
  }

  public static void publish(String projectId, String topicId) throws IOException {
    try (TopicAdminClient client = TopicAdminClient.create()) {
      String topic = TopicName.of(projectId, topicId).toString();
      PubsubMessage messages =
          PubsubMessage.newBuilder()
              .setData(ByteString.copyFromUtf8("Hello World"))
              .build();

      PublishRequest request =
          PublishRequest.newBuilder()
              .setTopic(topic)
              .addMessages(messages)
              .build();

      PublishResponse response = client.publish(request);
      for (String messageId : response.getMessageIdsList()) {
        System.out.println("Published message ID: " + messageId);
      }
    }
  }
}
// [END pubsub_v1_publisher_publish]
