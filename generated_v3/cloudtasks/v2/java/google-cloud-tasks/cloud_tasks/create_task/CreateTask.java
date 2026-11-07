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

// [START cloudtasks_v2_cloudtasks_task_create]
import com.google.cloud.tasks.v2.CloudTasksClient;
import com.google.cloud.tasks.v2.HttpMethod;
import com.google.cloud.tasks.v2.HttpRequest;
import com.google.cloud.tasks.v2.QueueName;
import com.google.cloud.tasks.v2.Task;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class CreateTask {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    createTask(projectId, locationId, queueId);
  }

  public static void createTask(String projectId, String locationId, String queueId)
      throws IOException {
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String parent = QueueName.of(projectId, locationId, queueId).toString();

      HttpRequest httpRequest =
          HttpRequest.newBuilder()
              .setUrl("https://example.com/taskhandler")
              .setHttpMethod(HttpMethod.POST)
              .setBody(ByteString.copyFrom("Sample payload", StandardCharsets.UTF_8))
              .build();

      Task task = Task.newBuilder().setHttpRequest(httpRequest).build();

      Task response = client.createTask(parent, task);
      System.out.println("Created task: " + response.getName());
    }
  }
}
// [END cloudtasks_v2_cloudtasks_task_create]
