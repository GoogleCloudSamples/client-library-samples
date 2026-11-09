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

// [START pubsub_v1_subscriber_subscription_update]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.protobuf.FieldMask;
import com.google.pubsub.v1.Subscription;
import com.google.pubsub.v1.SubscriptionName;
import com.google.pubsub.v1.UpdateSubscriptionRequest;

public class UpdateSubscription {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String subscriptionId = "example-subscription_id";
    updateSubscription(projectId, subscriptionId);
  }

  public static void updateSubscription(String projectId, String subscriptionId) throws Exception {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Subscription subscription =
          Subscription.newBuilder()
              .setName(SubscriptionName.of(projectId, subscriptionId).toString())
              .putLabels("env", "test")
              .build();

      UpdateSubscriptionRequest request =
          UpdateSubscriptionRequest.newBuilder()
              .setSubscription(subscription)
              .setUpdateMask(updateMask)
              .build();

      Subscription response = client.updateSubscription(request);
      System.out.println("Updated subscription: " + response.getName());
      System.out.println("Labels: " + response.getLabelsMap());
    }
  }
}
// [END pubsub_v1_subscriber_subscription_update]
