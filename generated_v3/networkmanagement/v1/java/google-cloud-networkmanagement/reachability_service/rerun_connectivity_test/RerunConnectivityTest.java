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

package com.google.cloud.networkmanagement.v1;

// [START networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
import com.google.cloud.networkmanagement.v1.ConnectivityTest;
import com.google.cloud.networkmanagement.v1.ConnectivityTestName;
import com.google.cloud.networkmanagement.v1.ReachabilityServiceClient;
import com.google.cloud.networkmanagement.v1.RerunConnectivityTestRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class RerunConnectivityTest {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String testId = "example-test_id";
    rerunConnectivityTest(projectId, testId);
  }

  public static void rerunConnectivityTest(String projectId, String testId) throws Exception {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      String name = ConnectivityTestName.of(projectId, testId).toString();
      RerunConnectivityTestRequest request =
          RerunConnectivityTestRequest.newBuilder()
              .setName(name)
              .build();

      // RerunConnectivityTest initiates a long-running operation.
      ConnectivityTest response =
          client.rerunConnectivityTestAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Connectivity test rerun completed: " + response.getName());
      System.out.println("Reachability result: " + response.getReachabilityDetails().getResult());
    }
  }
}
// [END networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
