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

// [START datalineage_v1_lineage_run_update]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.Run;
import com.google.protobuf.FieldMask;
import com.google.protobuf.Timestamp;
import java.time.Instant;

public class UpdateRun {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    String runId = "example-run-id";
    updateRun(projectId, locationId, processId, runId);
  }

  public static void updateRun(String projectId, String locationId, String processId, String runId)
      throws Exception {
    try (LineageClient client = LineageClient.create()) {
      Instant now = Instant.now();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      Run run =
          Run.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/processes/%s/runs/%s",
                      projectId, locationId, processId, runId))
              .setDisplayName("Updated Run Display Name")
              .setStartTime(startTime)
              .setState(Run.State.STARTED)
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Run response = client.updateRun(run, updateMask);
      System.out.printf("Updated run: %s%n", response.getName());
    }
  }
}
// [END datalineage_v1_lineage_run_update]
