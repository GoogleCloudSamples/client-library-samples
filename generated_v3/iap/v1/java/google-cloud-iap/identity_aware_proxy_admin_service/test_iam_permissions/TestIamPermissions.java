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

package com.google.cloud.iap.v1;

// [START iap_v1_identityawareproxyadminservice_test_iam_permissions]
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;

public class TestIamPermissions {

  public static void main(String[] args) throws Exception {
    String resource = "projects/example-project-id/iap_web";
    testIamPermissions(resource);
  }

  public static void testIamPermissions(String resource) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      String permissions = "iap.web.getSettings";

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);
      System.out.println("Permissions granted for resource: " + resource);
      for (String permission : response.getPermissionsList()) {
        System.out.println("Permission: " + permission);
      }
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_test_iam_permissions]
