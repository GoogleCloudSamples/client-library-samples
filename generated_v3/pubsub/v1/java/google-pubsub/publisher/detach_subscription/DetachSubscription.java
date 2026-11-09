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

// [START pubsub_v1_publisher_detach_subscription]
import com.google.cloud.pubsub.v1.TopicAdminClient;
import com.google.pubsub.v1.DetachSubscriptionRequest;
import com.google.pubsub.v1.DetachSubscriptionResponse;
import com.google.pubsub.v1.SubscriptionName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DetachSubscription {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String subscriptionId = "example-subscription_id";
    detachSubscription(projectId, subscriptionId);
  }

  public static void detachSubscription(String projectId, String subscriptionId) throws Exception {
    try (TopicAdminClient client = TopicAdminClient.create()) {
      String subscription = SubscriptionName.of(projectId, subscriptionId).toString();
      DetachSubscriptionRequest request =
          DetachSubscriptionRequest.newBuilder().setSubscription(subscription).build();
      DetachSubscriptionResponse response = client.detachSubscription(request);
      System.out.println("Detached subscription: " + subscription);
    }
  }
}
// [END pubsub_v1_publisher_detach_subscription]
