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

package com.google.cloud.artifactregistry.v1beta2;

// [START artifactregistry_v1beta2_artifactregistry_test_iam_permissions]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String repositoryId = "example-repository-id";
    testIamPermissions(projectId, locationId, repositoryId);
  }

  public static void testIamPermissions(
      String projectId, String locationId, String repositoryId) throws IOException {
    // Initialize client that will be closed when the block finishes
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String resource =
          String.format(
              "projects/%s/locations/%s/repositories/%s", projectId, locationId, repositoryId);
      List<String> permissions =
          Arrays.asList(
              "artifactregistry.repositories.get",
              "artifactregistry.repositories.update");

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
// [END artifactregistry_v1beta2_artifactregistry_test_iam_permissions]
