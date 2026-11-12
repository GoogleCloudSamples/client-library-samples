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

// [START datalineage_v1_lineage_process_update]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.Process;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateProcess {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processId = "example-process_id";
    updateProcess(projectId, locationId, processId);
  }

  public static void updateProcess(String projectId, String locationId, String processId)
      throws IOException {
    try (LineageClient client = LineageClient.create()) {
      // Define the target process and the fields to update.
      Process process =
          Process.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/processes/%s", projectId, locationId, processId))
              .setDisplayName("example-updated-display-name")
              .build();

      // Specify which fields to apply during the update operation.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Process response = client.updateProcess(process, updateMask);
      System.out.println("Updated process: " + response.getName());
    }
  }
}
// [END datalineage_v1_lineage_process_update]
