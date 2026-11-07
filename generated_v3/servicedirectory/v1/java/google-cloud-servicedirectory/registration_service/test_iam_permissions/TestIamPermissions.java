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

package com.google.cloud.servicedirectory.v1;

// [START servicedirectory_v1_registrationservice_test_iam_permissions]
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;

public class TestIamPermissions {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    testIamPermissions(projectId, locationId, namespaceId);
  }

  public static void testIamPermissions(String projectId, String locationId, String namespaceId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String permissions = "servicedirectory.namespaces.get";
      String resource = NamespaceName.of(projectId, locationId, namespaceId).toString();

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);
      System.out.println("Granted permissions: " + response.getPermissionsList());
    }
  }
}
// [END servicedirectory_v1_registrationservice_test_iam_permissions]
