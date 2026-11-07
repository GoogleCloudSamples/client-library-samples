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

package com.google.cloud.spanner.v1;

// [START spanner_v1_instanceadmin_test_iam_permissions]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String instanceId = "example-instance-id";
    testIamPermissions(projectId, instanceId);
  }

  public static void testIamPermissions(String projectId, String instanceId) throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String resource = String.format("projects/%s/instances/%s", projectId, instanceId);
      List<String> permissions =
          Arrays.asList("spanner.instances.get", "spanner.instances.update");

      TestIamPermissionsResponse response = client.testIamPermissions(resource, permissions);
      System.out.println("Granted permissions: " + response.getPermissionsList());
    }
  }
}
// [END spanner_v1_instanceadmin_test_iam_permissions]
