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

package com.google.cloud.notebooks.v1;

// [START notebooks_v1_notebookservice_execution_get]
import com.google.cloud.notebooks.v1.Execution;
import com.google.cloud.notebooks.v1.NotebookServiceClient;
import java.io.IOException;

public class GetExecution {

  public static void getExecution(String projectId, String locationId, String executionId)
      throws IOException {
    try (NotebookServiceClient client = NotebookServiceClient.create()) {
      // The Notebooks API resource path requires the plural 'locations' collection.
      String name =
          String.format("projects/%s/locations/%s/executions/%s", projectId, locationId, executionId);
      Execution response = client.getExecution(name);
      System.out.println("Execution name: " + response.getName());
      System.out.println("Execution state: " + response.getState());
    }
  }
}
// [END notebooks_v1_notebookservice_execution_get]
