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

// [START workflowexecutions_v1beta_executions_execution_get]
import com.google.cloud.workflows.executions.v1beta.Execution;
import com.google.cloud.workflows.executions.v1beta.ExecutionName;
import com.google.cloud.workflows.executions.v1beta.ExecutionsClient;
import java.io.IOException;

public class GetExecution {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workflowId = "example-workflow-id";
    String executionId = "example-execution-id";
    getExecution(projectId, locationId, workflowId, executionId);
  }

  public static void getExecution(
      String projectId, String locationId, String workflowId, String executionId)
      throws IOException {
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String name = ExecutionName.of(projectId, locationId, workflowId, executionId).toString();
      Execution response = client.getExecution(name);

      System.out.println("Execution name: " + response.getName());
      System.out.println("Execution state: " + response.getState());
    }
  }
}
// [END workflowexecutions_v1beta_executions_execution_get]
