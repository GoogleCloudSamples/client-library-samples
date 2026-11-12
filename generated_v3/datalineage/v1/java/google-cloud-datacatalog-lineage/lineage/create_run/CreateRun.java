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

package com.google.cloud.datalineage.v1;

// [START datalineage_v1_lineage_run_create]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.Run;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.time.Instant;

public class CreateRun {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    createRun(projectId, locationId, processId);
  }

  public static void createRun(String projectId, String locationId, String processId)
      throws IOException {
    try (LineageClient client = LineageClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/processes/%s", projectId, locationId, processId);

      Instant now = Instant.now();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      Run run =
          Run.newBuilder()
              .setState(Run.State.STARTED)
              .setStartTime(startTime)
              .setDisplayName("example-run")
              .build();

      Run response = client.createRun(parent, run);
      System.out.printf("Created run: %s%n", response.getName());
      System.out.printf("Run state: %s%n", response.getState());
    }
  }
}
// [END datalineage_v1_lineage_run_create]
