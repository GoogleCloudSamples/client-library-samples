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

// [START pubsub_v1_subscriber_snapshot_get]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.pubsub.v1.Snapshot;
import com.google.pubsub.v1.SnapshotName;
import java.io.IOException;

public class GetSnapshot {

  public static void getSnapshot(String projectId, String snapId) throws IOException {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      String snapshot = SnapshotName.of(projectId, snapId).toString();
      Snapshot response = client.getSnapshot(snapshot);
      System.out.println("Snapshot name: " + response.getName());
      System.out.println("Topic name: " + response.getTopic());
      System.out.println("Expire time: " + response.getExpireTime());
    }
  }
}
// [END pubsub_v1_subscriber_snapshot_get]
