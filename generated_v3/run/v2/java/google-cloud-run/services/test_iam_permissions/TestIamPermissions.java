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

// [START run_v2_services_test_iam_permissions]
import com.google.cloud.run.v2.ServiceName;
import com.google.cloud.run.v2.ServicesClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String serviceId = "example-service-id";
    testIamPermissions(projectId, locationId, serviceId);
  }

  public static void testIamPermissions(String projectId, String locationId, String serviceId)
      throws IOException {
    // Initialize client that will be automatically closed after use.
    try (ServicesClient client = ServicesClient.create()) {
      List<String> permissions = Arrays.asList("run.services.get", "run.services.update");
      String resource = ServiceName.of(projectId, locationId, serviceId).toString();

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addAllPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);

      System.out.println("Tested IAM permissions for resource: " + resource);
      for (String permission : response.getPermissionsList()) {
        System.out.println("Granted permission: " + permission);
      }
    }
  }
}
// [END run_v2_services_test_iam_permissions]
