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

// [START cloudresourcemanager_v3_tagvalues_test_iam_permissions]
import com.google.cloud.resourcemanager.v3.TagValuesClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String tagValueId = "example-tag-value-id";
    testIamPermissions(tagValueId);
  }

  // Tests IAM permissions on a TagValue resource.
  public static void testIamPermissions(String tagValueId) throws IOException {
    try (TagValuesClient client = TagValuesClient.create()) {
      String resource = "tagValues/" + tagValueId;
      List<String> permissions =
          Arrays.asList("resourcemanager.tagValues.get", "resourcemanager.tagValues.update");

      TestIamPermissionsRequest request =
          TestIamPermissionsRequest.newBuilder()
              .setResource(resource)
              .addAllPermissions(permissions)
              .build();

      TestIamPermissionsResponse response = client.testIamPermissions(request);

      for (String permission : response.getPermissionsList()) {
        System.out.println("Permission granted: " + permission);
      }
    }
  }
}
// [END cloudresourcemanager_v3_tagvalues_test_iam_permissions]
