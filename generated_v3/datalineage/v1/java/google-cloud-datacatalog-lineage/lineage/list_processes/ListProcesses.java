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

// [START datalineage_v1_lineage_processes_list]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.LineageSettings;
import com.google.cloud.datacatalog.lineage.v1.Process;
import java.io.IOException;

public class ListProcesses {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listProcesses(projectId, locationId);
  }

  // Lists lineage processes in the specified project and location.
  public static void listProcesses(String projectId, String locationId) throws IOException {
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);

    // Lineage requires connecting to the regional service endpoint.
    LineageSettings settings =
        LineageSettings.newBuilder()
            .setEndpoint(String.format("%s-datalineage.googleapis.com:443", locationId))
            .build();

    try (LineageClient client = LineageClient.create(settings)) {
      for (Process process : client.listProcesses(parent).iterateAll()) {
        System.out.println("Process: " + process.getName());
        System.out.println("Display name: " + process.getDisplayName());
      }
    }
  }
}
// [END datalineage_v1_lineage_processes_list]
