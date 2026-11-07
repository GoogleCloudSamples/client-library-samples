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

// [START datalineage_v1_lineage_process_get]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.Process;
import com.google.cloud.datacatalog.lineage.v1.ProcessName;
import java.io.IOException;

public class GetProcess {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    getProcess(projectId, locationId, processId);
  }

  public static void getProcess(String projectId, String locationId, String processId)
      throws IOException {
    try (LineageClient client = LineageClient.create()) {
      String name = ProcessName.of(projectId, locationId, processId).toString();

      Process process = client.getProcess(name);

      System.out.println("Process retrieved: " + process.getName());
      System.out.println("Display name: " + process.getDisplayName());
    }
  }
}
// [END datalineage_v1_lineage_process_get]
