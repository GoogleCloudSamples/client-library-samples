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

// [START networkmanagement_v1beta1_reachabilityservice_connectivitytest_delete]
import com.google.cloud.networkmanagement.v1beta1.DeleteConnectivityTestRequest;
import com.google.cloud.networkmanagement.v1beta1.ReachabilityServiceClient;
import java.util.concurrent.TimeUnit;

public class DeleteConnectivityTest {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String testId = "example-test-id";
    deleteConnectivityTest(projectId, testId);
  }

  public static void deleteConnectivityTest(String projectId, String testId) throws Exception {
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      String name =
          String.format("projects/%s/locations/global/connectivityTests/%s", projectId, testId);
      DeleteConnectivityTestRequest request =
          DeleteConnectivityTestRequest.newBuilder().setName(name).build();

      // Wait for the long-running operation to complete.
      client.deleteConnectivityTestAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Connectivity test deleted successfully: " + name);
    }
  }
}
// [END networkmanagement_v1beta1_reachabilityservice_connectivitytest_delete]
