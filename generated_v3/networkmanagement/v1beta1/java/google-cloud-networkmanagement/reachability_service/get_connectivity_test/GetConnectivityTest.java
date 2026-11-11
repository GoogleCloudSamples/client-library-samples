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

// [START networkmanagement_v1beta1_reachabilityservice_connectivitytest_get]
import com.google.cloud.networkmanagement.v1beta1.ConnectivityTest;
import com.google.cloud.networkmanagement.v1beta1.GetConnectivityTestRequest;
import com.google.cloud.networkmanagement.v1beta1.ReachabilityServiceClient;
import java.io.IOException;

public class GetConnectivityTest {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String testId = "example-test-id";
    getConnectivityTest(projectId, testId);
  }

  public static void getConnectivityTest(String projectId, String testId) throws IOException {
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      String name =
          String.format("projects/%s/locations/global/connectivityTests/%s", projectId, testId);
      GetConnectivityTestRequest request =
          GetConnectivityTestRequest.newBuilder().setName(name).build();

      ConnectivityTest response = client.getConnectivityTest(request);
      System.out.println("Connectivity test name: " + response.getName());
      System.out.println("Reachability result: " + response.getReachabilityDetails().getResult());
    }
  }
}
// [END networkmanagement_v1beta1_reachabilityservice_connectivitytest_get]
