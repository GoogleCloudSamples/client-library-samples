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

// [START pubsub_v1_subscriber_subscription_create]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.pubsub.v1.Subscription;
import com.google.pubsub.v1.SubscriptionName;
import com.google.pubsub.v1.TopicName;
import java.io.IOException;

public class CreateSubscription {

  public static void createSubscription(String projectId, String subscriptionId, String topicId)
      throws IOException {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      String name = SubscriptionName.of(projectId, subscriptionId).toString();
      String topic = TopicName.of(projectId, topicId).toString();

      Subscription subscription =
          Subscription.newBuilder()
              .setName(name)
              .setTopic(topic)
              .setAckDeadlineSeconds(10)
              .build();

      Subscription response = client.createSubscription(subscription);
      System.out.println("Created subscription: " + response.getName());
    }
  }
}
// [END pubsub_v1_subscriber_subscription_create]
