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

package com.google.cloud.bigqueryconnection.v1beta1;

// [START bigqueryconnection_v1beta1_connectionservice_test_iam_permissions]
import com.google.cloud.bigquery.connection.v1beta1.ConnectionName;
import com.google.cloud.bigquery.connection.v1beta1.ConnectionServiceClient;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String connectionId = "example-connection-id";
    testIamPermissions(projectId, locationId, connectionId);
  }

  public static void testIamPermissions(String projectId, String locationId, String connectionId)
      throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      String resource = ConnectionName.of(projectId, locationId, connectionId).toString();
      List<String> permissions =
          Arrays.asList("bigquery.connections.get", "bigquery.connections.update");

      TestIamPermissionsResponse response = client.testIamPermissions(resource, permissions);
      System.out.println("Permissions granted: " + response.getPermissionsList());
    }
  }
}
// [END bigqueryconnection_v1beta1_connectionservice_test_iam_permissions]
