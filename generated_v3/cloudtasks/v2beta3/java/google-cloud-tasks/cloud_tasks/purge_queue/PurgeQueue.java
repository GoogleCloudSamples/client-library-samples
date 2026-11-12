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

package com.google.cloud.cloudtasks.v2beta3;

// [START cloudtasks_v2beta3_cloudtasks_purge_queue]
import com.google.cloud.tasks.v2beta3.CloudTasksClient;
import com.google.cloud.tasks.v2beta3.Queue;
import com.google.cloud.tasks.v2beta3.QueueName;

public class PurgeQueue {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    purgeQueue(projectId, locationId, queueId);
  }

  public static void purgeQueue(String projectId, String locationId, String queueId)
      throws Exception {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String name = QueueName.of(projectId, locationId, queueId).toString();
      Queue response = client.purgeQueue(name);
      System.out.println("Purged queue: " + response.getName());
    }
  }
}
// [END cloudtasks_v2beta3_cloudtasks_purge_queue]
