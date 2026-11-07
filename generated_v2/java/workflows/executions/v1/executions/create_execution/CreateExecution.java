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

package com.google.cloud.workflowexecutions.v1;

// [START workflowexecutions_v1_executions_execution_create]
import com.google.cloud.workflows.executions.v1.Execution;
import com.google.cloud.workflows.executions.v1.ExecutionsClient;
import java.io.IOException;

public class CreateExecution {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String workflowId = "example-workflow-id";
    createExecution(projectId, locationId, workflowId);
  }

  public static void createExecution(String projectId, String locationId, String workflowId)
      throws IOException {
    // Initialize the client. Client instances can be reused for multiple requests.
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/workflows/%s", projectId, locationId, workflowId);
      Execution execution = Execution.newBuilder().setArgument("{}").build();

      Execution response = client.createExecution(parent, execution);
      System.out.println("Created execution: " + response.getName());
    }
  }
}
// [END workflowexecutions_v1_executions_execution_create]
