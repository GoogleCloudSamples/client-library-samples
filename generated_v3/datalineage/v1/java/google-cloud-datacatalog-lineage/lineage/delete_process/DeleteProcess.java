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

// [START datalineage_v1_lineage_process_delete]
import com.google.cloud.datacatalog.lineage.v1.LineageClient;
import com.google.cloud.datacatalog.lineage.v1.ProcessName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteProcess {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processId = "example-process-id";
    deleteProcess(projectId, locationId, processId);
  }

  public static void deleteProcess(String projectId, String locationId, String processId)
      throws Exception {
    try (LineageClient client = LineageClient.create()) {
      String name = ProcessName.of(projectId, locationId, processId).toString();
      client.deleteProcessAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted lineage process: %s%n", name);
    }
  }
}
// [END datalineage_v1_lineage_process_delete]
