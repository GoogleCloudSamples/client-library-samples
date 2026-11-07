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

// [START run_v2_tasks_task_get]
import com.google.cloud.run.v2.Task;
import com.google.cloud.run.v2.TaskName;
import com.google.cloud.run.v2.TasksClient;

public class GetTask {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    String executionId = "example-execution_id";
    String taskId = "example-task_id";
    getTask(projectId, locationId, jobId, executionId, taskId);
  }

  public static void getTask(
      String projectId, String locationId, String jobId, String executionId, String taskId)
      throws Exception {
    try (TasksClient client = TasksClient.create()) {
      String name = TaskName.of(projectId, locationId, jobId, executionId, taskId).toString();
      Task response = client.getTask(name);
      System.out.println("Task name: " + response.getName());
    }
  }
}
// [END run_v2_tasks_task_get]
