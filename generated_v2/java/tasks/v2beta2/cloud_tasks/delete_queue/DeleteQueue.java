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

// [START cloudtasks_v2beta2_cloudtasks_queue_delete]
import com.google.cloud.tasks.v2beta2.CloudTasksClient;
import com.google.cloud.tasks.v2beta2.QueueName;

public class DeleteQueue {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String queueId = "example-queue_id";
    deleteQueue(projectId, locationId, queueId);
  }

  public static void deleteQueue(String projectId, String locationId, String queueId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String name = QueueName.of(projectId, locationId, queueId).toString();

      client.deleteQueue(name);
      System.out.println("Deleted queue: " + name);
    }
  }
}
// [END cloudtasks_v2beta2_cloudtasks_queue_delete]
