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

package com.google.cloud.workflowexecutions.v1beta;

// [START workflowexecutions_v1beta_executions_executions_list]
import com.google.cloud.workflows.executions.v1beta.Execution;
import com.google.cloud.workflows.executions.v1beta.ExecutionsClient;
import java.io.IOException;

public class ListExecutions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workflowId = "example-workflow-id";
    listExecutions(projectId, locationId, workflowId);
  }

  public static void listExecutions(String projectId, String locationId, String workflowId)
      throws IOException {
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/workflows/%s", projectId, locationId, workflowId);
      for (Execution responseItem : client.listExecutions(parent).iterateAll()) {
        System.out.println("Execution: " + responseItem.getName());
      }
    }
  }
}
// [END workflowexecutions_v1beta_executions_executions_list]
