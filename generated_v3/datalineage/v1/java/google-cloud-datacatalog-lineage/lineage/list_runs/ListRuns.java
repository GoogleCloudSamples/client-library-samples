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

// [START datalineage_v1_lineage_runs_list]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.ProcessName;
import com.google.cloud.datacatalog.lineage.v1.Run;
import java.io.IOException;

public class ListRuns {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    listRuns(projectId, locationId, processId);
  }

  public static void listRuns(String projectId, String locationId, String processId)
      throws IOException {
    // Initialize the Lineage client with Application Default Credentials.
    try (LineageClient client = LineageClient.create()) {
      String parent = ProcessName.of(projectId, locationId, processId).toString();

      // Retrieve and print each lineage run for the specified process.
      for (Run run : client.listRuns(parent).iterateAll()) {
        System.out.println("Run name: " + run.getName());
        System.out.println("Run state: " + run.getState());
      }
    }
  }
}
// [END datalineage_v1_lineage_runs_list]
