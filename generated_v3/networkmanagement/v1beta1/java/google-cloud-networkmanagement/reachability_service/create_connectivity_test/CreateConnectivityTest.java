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

// [START networkmanagement_v1beta1_reachabilityservice_connectivitytest_create]
import com.google.cloud.networkmanagement.v1beta1.ConnectivityTest;
import com.google.cloud.networkmanagement.v1beta1.CreateConnectivityTestRequest;
import com.google.cloud.networkmanagement.v1beta1.Endpoint;
import com.google.cloud.networkmanagement.v1beta1.ReachabilityServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateConnectivityTest {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String testId = "example-test-id";
    createConnectivityTest(projectId, testId);
  }

  public static void createConnectivityTest(String projectId, String testId)
      throws IOException, ExecutionException, InterruptedException {
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);

      Endpoint source =
          Endpoint.newBuilder()
              .setIpAddress("10.0.0.1")
              .setNetwork(String.format("projects/%s/global/networks/default", projectId))
              .build();

      Endpoint destination =
          Endpoint.newBuilder()
              .setIpAddress("10.0.0.2")
              .setPort(80)
              .build();

      ConnectivityTest resource =
          ConnectivityTest.newBuilder()
              .setDescription("Connectivity test between source and destination")
              .setProtocol("TCP")
              .setSource(source)
              .setDestination(destination)
              .build();

      CreateConnectivityTestRequest request =
          CreateConnectivityTestRequest.newBuilder()
              .setParent(parent)
              .setTestId(testId)
              .setResource(resource)
              .build();

      // Initiate the long-running operation and wait for completion
      ConnectivityTest response = client.createConnectivityTestAsync(request).get();

      System.out.println("Created connectivity test: " + response.getName());
    }
  }
}
// [END networkmanagement_v1beta1_reachabilityservice_connectivitytest_create]
