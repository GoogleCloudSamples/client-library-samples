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

package com.google.cloud.batch.v1alpha;

// [START batch_v1alpha_batchservice_tasks_list]
import com.google.cloud.batch.v1alpha.BatchServiceClient;
import com.google.cloud.batch.v1alpha.Task;
import java.io.IOException;

public class ListTasks {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String jobId = "example-job_id";
    String taskGroupId = "example-task_group_id";
    listTasks(projectId, locationId, jobId, taskGroupId);
  }

  public static void listTasks(String projectId, String locationId, String jobId, String taskGroupId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (BatchServiceClient client = BatchServiceClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/jobs/%s/taskGroups/%s",
              projectId, locationId, jobId, taskGroupId);

      for (Task task : client.listTasks(parent).iterateAll()) {
        System.out.println("Task: " + task.getName());
        System.out.println("State: " + task.getStatus().getState());
      }
    }
  }
}
// [END batch_v1alpha_batchservice_tasks_list]
