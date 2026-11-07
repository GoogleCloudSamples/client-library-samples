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

// [START pubsub_v1_subscriber_seek]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.protobuf.Timestamp;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.SeekRequest;
import com.google.pubsub.v1.SeekResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;

public class Seek {

  static {
    LogManager.getLogManager().reset();
    Logger.getLogger("").setLevel(Level.OFF);
  }

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String subscriptionId = "example-subscription-id";
    seek(projectId, subscriptionId);
  }

  public static void seek(String projectId, String subscriptionId) throws IOException {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      String subscription = ProjectSubscriptionName.format(projectId, subscriptionId);
      Instant now = Instant.now();
      Timestamp time =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      SeekRequest request =
          SeekRequest.newBuilder()
              .setSubscription(subscription)
              .setTime(time)
              .build();

      SeekResponse response = client.seek(request);
      System.out.println("Seek operation completed for subscription: " + subscription);
    }
  }
}
// [END pubsub_v1_subscriber_seek]
