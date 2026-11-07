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

// [START pubsub_v1_subscriber_pull]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.PullResponse;
import com.google.pubsub.v1.ReceivedMessage;

public class Pull {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String subscriptionId = "example-subscription-id";
    pull(projectId, subscriptionId);
  }

  public static void pull(String projectId, String subscriptionId) throws Exception {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      String subscription = ProjectSubscriptionName.format(projectId, subscriptionId);
      int maxMessages = 10;

      PullResponse response = client.pull(subscription, maxMessages);
      for (ReceivedMessage receivedMessage : response.getReceivedMessagesList()) {
        System.out.println("Message ID: " + receivedMessage.getMessage().getMessageId());
        System.out.println("Data: " + receivedMessage.getMessage().getData().toStringUtf8());
      }
      System.out.println("Pulled " + response.getReceivedMessagesCount() + " messages.");
    }
  }
}
// [END pubsub_v1_subscriber_pull]
