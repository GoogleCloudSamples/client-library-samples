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

package com.google.cloud.cloudresourcemanager.v3;

// [START cloudresourcemanager_v3_folders_test_iam_permissions]
import com.google.cloud.resourcemanager.v3.FoldersClient;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    // Provide the server-generated folder ID of an existing active folder.
    String folderId = "example-folder-id";
    testIamPermissions(folderId);
  }

  public static void testIamPermissions(String folderId) throws IOException {
    try (FoldersClient client = FoldersClient.create()) {
      List<String> permissions = Arrays.asList("resourcemanager.folders.get");
      String resource = "folders/" + folderId;

      TestIamPermissionsResponse response = client.testIamPermissions(resource, permissions);
      System.out.println("Allowed permissions: " + response.getPermissionsList());
    }
  }
}
// [END cloudresourcemanager_v3_folders_test_iam_permissions]
