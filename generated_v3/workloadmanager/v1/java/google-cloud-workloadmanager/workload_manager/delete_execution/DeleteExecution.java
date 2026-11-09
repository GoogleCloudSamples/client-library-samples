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

package com.google.cloud.workloadmanager.v1;

// [START workloadmanager_v1_workloadmanager_execution_delete]
import com.google.cloud.workloadmanager.v1.ExecutionName;
import com.google.cloud.workloadmanager.v1.WorkloadManagerClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteExecution {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String evaluationId = "example-evaluation_id";
    String executionId = "example-execution_id";
    deleteExecution(projectId, locationId, evaluationId, executionId);
  }

  public static void deleteExecution(
      String projectId, String locationId, String evaluationId, String executionId)
      throws Exception {
    try (WorkloadManagerClient client = WorkloadManagerClient.create()) {
      String name = ExecutionName.of(projectId, locationId, evaluationId, executionId).toString();

      // DeleteExecution is a long-running operation; wait for completion
      client.deleteExecutionAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted execution: %s%n", name);
    }
  }
}
// [END workloadmanager_v1_workloadmanager_execution_delete]
