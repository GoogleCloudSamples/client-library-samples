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

package com.google.cloud.run.v2;

// [START run_v2_workerpools_test_iam_permissions]
import com.google.cloud.run.v2.WorkerPoolsClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workerPoolId = "example-worker-pool-id";
    testIamPermissions(projectId, locationId, workerPoolId);
  }

  public static void testIamPermissions(String projectId, String locationId, String workerPoolId)
      throws Exception {
    // Initialize client that will be closed automatically with try-with-resources
    try (WorkerPoolsClient client = WorkerPoolsClient.create()) {
      String resource =
          String.format("projects/%s/locations/%s/workerPools/%s", projectId, locationId, workerPoolId);
      List<String> permissions = Arrays.asList("run.workerpools.get", "run.workerpools.update");

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addAllPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);
      System.out.println("Permissions granted: " + response.getPermissionsList());
    }
  }
}
// [END run_v2_workerpools_test_iam_permissions]
