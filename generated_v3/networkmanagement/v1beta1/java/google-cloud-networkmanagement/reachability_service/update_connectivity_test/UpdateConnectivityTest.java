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

package com.google.cloud.networkmanagement.v1beta1;

// [START networkmanagement_v1beta1_reachabilityservice_connectivitytest_update]
import com.google.cloud.networkmanagement.v1beta1.ConnectivityTest;
import com.google.cloud.networkmanagement.v1beta1.ReachabilityServiceClient;
import com.google.cloud.networkmanagement.v1beta1.UpdateConnectivityTestRequest;
import com.google.protobuf.FieldMask;
import java.util.concurrent.TimeUnit;

public class UpdateConnectivityTest {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String connectivityTestId = "example-connectivity-test-id";
    updateConnectivityTest(projectId, connectivityTestId);
  }

  public static void updateConnectivityTest(String projectId, String connectivityTestId)
      throws Exception {
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      ConnectivityTest resource =
          ConnectivityTest.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/global/connectivityTests/%s",
                      projectId, connectivityTestId))
              .setDescription("Updated test description")
              .build();
      UpdateConnectivityTestRequest request =
          UpdateConnectivityTestRequest.newBuilder()
              .setUpdateMask(updateMask)
              .setResource(resource)
              .build();

      ConnectivityTest response =
          client.updateConnectivityTestAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Updated connectivity test: " + response.getName());
    }
  }
}
// [END networkmanagement_v1beta1_reachabilityservice_connectivitytest_update]
