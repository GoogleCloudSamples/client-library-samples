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

package com.google.cloud.batch.v1;

// [START batch_v1_batchservice_tasks_list]
import com.google.cloud.batch.v1.BatchServiceClient;
import com.google.cloud.batch.v1.Task;
import com.google.cloud.batch.v1.TaskGroupName;
import java.io.IOException;

public class ListTasks {

  public static void listTasks(
      String projectId, String locationId, String jobId, String taskGroupId) throws IOException {
    // Initialize client that will be used to send requests.
    // Client instances should be reused for multiple requests and closed when no longer needed.
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent = TaskGroupName.of(projectId, locationId, jobId, taskGroupId).toString();

      for (Task task : client.listTasks(parent).iterateAll()) {
        System.out.println("Task: " + task.getName());
        System.out.println("State: " + task.getStatus().getState());
      }
    }
  }
}
// [END batch_v1_batchservice_tasks_list]
