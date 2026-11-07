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

// [START cloudtasks_v2beta2_cloudtasks_queues_list]
import com.google.cloud.tasks.v2beta2.CloudTasksClient;
import com.google.cloud.tasks.v2beta2.LocationName;
import com.google.cloud.tasks.v2beta2.Queue;
import java.io.IOException;

public class ListQueues {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listQueues(projectId, locationId);
  }

  public static void listQueues(String projectId, String locationId) throws IOException {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Queue queue : client.listQueues(parent).iterateAll()) {
        System.out.println(queue.getName());
      }
    }
  }
}
// [END cloudtasks_v2beta2_cloudtasks_queues_list]
