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

package com.google.cloud.secretmanager.v1beta1;

// [START secretmanager_v1beta1_secretmanagerservice_test_iam_permissions]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String secretId = "example-secret-id";
    testIamPermissions(projectId, secretId);
  }

  public static void testIamPermissions(String projectId, String secretId) throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      List<String> permissions =
          Arrays.asList("secretmanager.secrets.get", "secretmanager.secrets.update");
      String resource = SecretName.of(projectId, secretId).toString();

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addAllPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);
      System.out.println("Allowed permissions: " + response.getPermissionsList());
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_test_iam_permissions]
