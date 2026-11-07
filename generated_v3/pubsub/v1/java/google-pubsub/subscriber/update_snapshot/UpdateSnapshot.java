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

// [START pubsub_v1_subscriber_snapshot_update]
import com.google.cloud.pubsub.v1.SubscriptionAdminClient;
import com.google.protobuf.FieldMask;
import com.google.pubsub.v1.Snapshot;
import com.google.pubsub.v1.SnapshotName;
import com.google.pubsub.v1.UpdateSnapshotRequest;
import java.io.IOException;

public class UpdateSnapshot {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String snapshotId = "example-snapshot-id";
    updateSnapshot(projectId, snapshotId);
  }

  public static void updateSnapshot(String projectId, String snapshotId) throws Exception {
    try (SubscriptionAdminClient client = SubscriptionAdminClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Snapshot snapshot =
          Snapshot.newBuilder()
              .setName(SnapshotName.of(projectId, snapshotId).toString())
              .putLabels("env", "test")
              .build();

      UpdateSnapshotRequest request =
          UpdateSnapshotRequest.newBuilder()
              .setSnapshot(snapshot)
              .setUpdateMask(updateMask)
              .build();

      Snapshot response = client.updateSnapshot(request);
      System.out.println("Updated snapshot: " + response.getName());
      System.out.println("Updated labels: " + response.getLabelsMap());
    }
  }
}
// [END pubsub_v1_subscriber_snapshot_update]
