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

// [START workflowexecutions_v1_executions_execution_cancel]
import com.google.cloud.workflows.executions.v1.CancelExecutionRequest;
import com.google.cloud.workflows.executions.v1.Execution;
import com.google.cloud.workflows.executions.v1.ExecutionName;
import com.google.cloud.workflows.executions.v1.ExecutionsClient;
import java.io.IOException;

public class CancelExecution {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String workflowId = "example-workflow-id";
    String executionId = "example-execution-id";
    cancelExecution(projectId, locationId, workflowId, executionId);
  }

  public static void cancelExecution(
      String projectId, String locationId, String workflowId, String executionId)
      throws IOException {
    // Initialize the client. Clients can be reused for multiple requests.
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String name = ExecutionName.of(projectId, locationId, workflowId, executionId).toString();

      CancelExecutionRequest request =
          CancelExecutionRequest.newBuilder()
              .setName(name)
              .build();

      Execution response = client.cancelExecution(request);
      System.out.println("Execution cancelled: " + response.getName());
      System.out.println("Execution state: " + response.getState());
    }
  }
}
// [END workflowexecutions_v1_executions_execution_cancel]
