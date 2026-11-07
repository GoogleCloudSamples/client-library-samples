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

package com.google.cloud.cloudtasks.v2;

// [START cloudtasks_v2_cloudtasks_run_task]
import com.google.cloud.tasks.v2.CloudTasksClient;
import com.google.cloud.tasks.v2.RunTaskRequest;
import com.google.cloud.tasks.v2.Task;
import com.google.cloud.tasks.v2.TaskName;
import java.io.IOException;

public class RunTask {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    String taskId = "example-task-id";
    runTask(projectId, locationId, queueId, taskId);
  }

  public static void runTask(String projectId, String locationId, String queueId, String taskId)
      throws IOException {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String name = TaskName.of(projectId, locationId, queueId, taskId).toString();
      RunTaskRequest request = RunTaskRequest.newBuilder().setName(name).build();
      Task response = client.runTask(request);
      System.out.println("Ran task: " + response.getName());
    }
  }
}
// [END cloudtasks_v2_cloudtasks_run_task]
