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

// [START run_v2_executions_executions_list]
import com.google.cloud.run.v2.Execution;
import com.google.cloud.run.v2.ExecutionsClient;
import java.io.IOException;

public class ListExecutions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String jobId = "example-job-id";
    listExecutions(projectId, locationId, jobId);
  }

  public static void listExecutions(String projectId, String locationId, String jobId)
      throws Exception {
    // Initialize client that will be closed when the try-with-resources block exits.
    try (ExecutionsClient client = ExecutionsClient.create()) {
      String parent = String.format("projects/%s/locations/%s/jobs/%s", projectId, locationId, jobId);

      for (Execution execution : client.listExecutions(parent).iterateAll()) {
        System.out.println("Execution: " + execution.getName());
      }
    }
  }
}
// [END run_v2_executions_executions_list]
