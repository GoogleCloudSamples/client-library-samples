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

// [START cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
import com.google.cloud.tasks.v2beta3.CloudTasksClient;
import com.google.cloud.tasks.v2beta3.QueueName;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String queueId = "example-queue-id";
    testIamPermissions(projectId, locationId, queueId);
  }

  public static void testIamPermissions(String projectId, String locationId, String queueId)
      throws IOException {
    // Initialize client that will be closed when the block finishes
    try (CloudTasksClient client = CloudTasksClient.create()) {
      String resource = QueueName.of(projectId, locationId, queueId).toString();
      List<String> permissions =
          Arrays.asList("cloudtasks.queues.get", "cloudtasks.queues.delete");

      TestIamPermissionsResponse response = client.testIamPermissions(resource, permissions);

      System.out.println("Tested permissions for resource: " + resource);
      for (String permission : response.getPermissionsList()) {
        System.out.println("Permission granted: " + permission);
      }
    }
  }
}
// [END cloudtasks_v2beta3_cloudtasks_test_iam_permissions]
