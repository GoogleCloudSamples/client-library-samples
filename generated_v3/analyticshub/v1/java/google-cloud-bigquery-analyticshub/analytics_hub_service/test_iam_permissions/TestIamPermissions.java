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

package com.google.cloud.analyticshub.v1;

// [START analyticshub_v1_analyticshubservice_test_iam_permissions]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class TestIamPermissions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    testIamPermissions(projectId, locationId, dataExchangeId);
  }

  public static void testIamPermissions(String projectId, String locationId, String dataExchangeId)
      throws IOException {
    // Initialize the client that sends requests. The client can be reused for
    // multiple requests and relies on Application Default Credentials.
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String resource = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();
      List<String> permissions =
          Arrays.asList("analyticshub.dataExchanges.get", "analyticshub.dataExchanges.update");

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
// [END analyticshub_v1_analyticshubservice_test_iam_permissions]
