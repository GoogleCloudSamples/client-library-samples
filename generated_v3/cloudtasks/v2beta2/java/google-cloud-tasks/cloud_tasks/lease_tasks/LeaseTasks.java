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

package com.google.cloud.cloudtasks.v2beta2;

// [START cloudtasks_v2beta2_cloudtasks_lease_tasks]
import com.google.cloud.tasks.v2beta2.CloudTasksClient;
import com.google.cloud.tasks.v2beta2.LeaseTasksRequest;
import com.google.cloud.tasks.v2beta2.LeaseTasksResponse;
import com.google.cloud.tasks.v2beta2.QueueName;
import com.google.cloud.tasks.v2beta2.Task;
import com.google.protobuf.Duration;
import java.io.IOException;

public class LeaseTasks {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    leaseTasks(projectId, locationId, queueId);
  }

  public static void leaseTasks(String projectId, String locationId, String queueId)
      throws IOException {
    // Initialize the client for sending requests.
    try (CloudTasksClient client = CloudTasksClient.create()) {
      // Set the task lease duration to 10 minutes (600 seconds).
      Duration leaseDuration = Duration.newBuilder().setSeconds(600).build();
      String parent = QueueName.of(projectId, locationId, queueId).toString();

      LeaseTasksRequest request =
          LeaseTasksRequest.newBuilder()
              .setParent(parent)
              .setLeaseDuration(leaseDuration)
              .setMaxTasks(10)
              .setResponseView(Task.View.FULL)
              .build();

      LeaseTasksResponse response = client.leaseTasks(request);

      for (Task task : response.getTasksList()) {
        System.out.println("Leased task: " + task.getName());
      }
    }
  }
}
// [END cloudtasks_v2beta2_cloudtasks_lease_tasks]
