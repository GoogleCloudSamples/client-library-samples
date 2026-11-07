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

// [START run_v2_executions_execution_delete]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.run.v2.Execution;
import com.google.cloud.run.v2.ExecutionName;
import com.google.cloud.run.v2.ExecutionsClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteExecution {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    deleteExecution(projectId);
  }

  public static void deleteExecution(String projectId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String name =
          ExecutionName.of(projectId, "us-central1", "example-job", "example-execution").toString();

      try {
        Execution response = client.deleteExecutionAsync(name).get(5, TimeUnit.MINUTES);
        System.out.println("Deleted execution: " + response.getName());
      } catch (NotFoundException e) {
        System.out.println("Deleted execution: " + name);
      } catch (ExecutionException e) {
        if (e.getCause() instanceof NotFoundException) {
          System.out.println("Deleted execution: " + name);
        } else {
          throw e;
        }
      }
    }
  }
}
// [END run_v2_executions_execution_delete]
