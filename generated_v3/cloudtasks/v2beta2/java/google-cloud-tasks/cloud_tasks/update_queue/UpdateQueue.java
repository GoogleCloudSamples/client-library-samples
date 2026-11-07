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

// [START cloudtasks_v2beta2_cloudtasks_queue_update]
import com.google.cloud.tasks.v2beta2.CloudTasksClient;
import com.google.cloud.tasks.v2beta2.Queue;
import com.google.cloud.tasks.v2beta2.QueueName;
import com.google.cloud.tasks.v2beta2.RateLimits;
import com.google.protobuf.FieldMask;

public class UpdateQueue {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    updateQueue(projectId, locationId, queueId);
  }

  public static void updateQueue(String projectId, String locationId, String queueId)
      throws Exception {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      Queue queue =
          Queue.newBuilder()
              .setName(QueueName.of(projectId, locationId, queueId).toString())
              .setRateLimits(
                  RateLimits.newBuilder().setMaxTasksDispatchedPerSecond(20.0).build())
              .build();

      FieldMask updateMask =
          FieldMask.newBuilder()
              .addPaths("rate_limits.max_tasks_dispatched_per_second")
              .build();

      Queue updatedQueue = client.updateQueue(queue, updateMask);
      System.out.println("Updated queue: " + updatedQueue.getName());
    }
  }
}
// [END cloudtasks_v2beta2_cloudtasks_queue_update]
