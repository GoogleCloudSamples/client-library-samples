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

package com.google.cloud.file.v1;

// [START file_v1_cloudfilestoremanager_snapshot_update]
import com.google.cloud.filestore.v1.CloudFilestoreManagerClient;
import com.google.cloud.filestore.v1.Snapshot;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class UpdateSnapshot {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String instanceId = "example-instance-id";
    String snapshotId = "example-snapshot-id";
    updateSnapshot(projectId, locationId, instanceId, snapshotId);
  }

  public static void updateSnapshot(
      String projectId, String locationId, String instanceId, String snapshotId)
      throws IOException, ExecutionException, InterruptedException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      // Define the update mask specifying the fields to modify.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Construct the snapshot resource name and updated fields.
      String snapshotName =
          String.format(
              "projects/%s/locations/%s/instances/%s/snapshots/%s",
              projectId, locationId, instanceId, snapshotId);
      Snapshot snapshot =
          Snapshot.newBuilder()
              .setName(snapshotName)
              .setDescription("Updated description for Filestore snapshot")
              .build();

      // Send the update request and wait for the long-running operation to complete.
      Snapshot response = client.updateSnapshotAsync(snapshot, updateMask).get();

      System.out.println("Updated snapshot: " + response.getName());
    }
  }
}
// [END file_v1_cloudfilestoremanager_snapshot_update]
