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

// [START run_v2_tasks_tasks_list]
import com.google.cloud.run.v2.ExecutionName;
import com.google.cloud.run.v2.ListTasksRequest;
import com.google.cloud.run.v2.Task;
import com.google.cloud.run.v2.TasksClient;

public class ListTasks {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String jobId = "example-job-id";
    String executionId = "example-execution-id";
    listTasks(projectId, locationId, jobId, executionId);
  }

  public static void listTasks(
      String projectId, String locationId, String jobId, String executionId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (TasksClient client = TasksClient.create()) {
      String parent = ExecutionName.of(projectId, locationId, jobId, executionId).toString();
      ListTasksRequest request = ListTasksRequest.newBuilder().setParent(parent).build();

      for (Task task : client.listTasks(request).iterateAll()) {
        System.out.println("Task: " + task.getName());
        System.out.println("Index: " + task.getIndex());
      }
    }
  }
}
// [END run_v2_tasks_tasks_list]
