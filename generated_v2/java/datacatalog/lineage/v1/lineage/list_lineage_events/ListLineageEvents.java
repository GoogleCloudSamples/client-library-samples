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

// [START datalineage_v1_lineage_lineageevents_list]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.LineageEvent;
import com.google.cloud.datacatalog.lineage.v1.RunName;
import java.io.IOException;

public class ListLineageEvents {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    String runId = "example-run-id";
    listLineageEvents(projectId, locationId, processId, runId);
  }

  public static void listLineageEvents(
      String projectId, String locationId, String processId, String runId) throws IOException {
    try (LineageClient client = LineageClient.create()) {
      String parent = RunName.of(projectId, locationId, processId, runId).toString();
      for (LineageEvent event : client.listLineageEvents(parent).iterateAll()) {
        System.out.println("Lineage event: " + event.getName());
      }
    }
  }
}
// [END datalineage_v1_lineage_lineageevents_list]
