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

// [START cloudtasks_v2_cloudtasks_resume_queue]
import com.google.cloud.tasks.v2.CloudTasksClient;
import com.google.cloud.tasks.v2.Queue;
import com.google.cloud.tasks.v2.QueueName;

public class ResumeQueue {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    resumeQueue(projectId, locationId, queueId);
  }

  public static void resumeQueue(String projectId, String locationId, String queueId)
      throws Exception {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String name = QueueName.of(projectId, locationId, queueId).toString();
      Queue response = client.resumeQueue(name);

      System.out.println("Resumed queue: " + response.getName());
      System.out.println("Queue state: " + response.getState());
    }
  }
}
// [END cloudtasks_v2_cloudtasks_resume_queue]
