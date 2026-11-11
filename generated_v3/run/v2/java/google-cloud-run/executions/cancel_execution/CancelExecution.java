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

package com.google.cloud.run.v2;

// [START run_v2_executions_execution_cancel]
import com.google.cloud.run.v2.CancelExecutionRequest;
import com.google.cloud.run.v2.Execution;
import com.google.cloud.run.v2.ExecutionName;
import com.google.cloud.run.v2.ExecutionsClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CancelExecution {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    String executionId = "example-execution_id";
    cancelExecution(projectId, locationId, jobId, executionId);
  }

  public static void cancelExecution(
      String projectId, String locationId, String jobId, String executionId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String name = ExecutionName.of(projectId, locationId, jobId, executionId).toString();

      CancelExecutionRequest request =
          CancelExecutionRequest.newBuilder()
              .setName(name)
              .build();

      // CancelExecution is a long-running operation; wait for completion.
      Execution response = client.cancelExecutionAsync(request).get();
      System.out.println("Cancelled execution: " + response.getName());
    }
  }
}
// [END run_v2_executions_execution_cancel]
