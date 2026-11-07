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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_create]
import com.google.cloud.networkmanagement.v1.ConnectivityTest;
import com.google.cloud.networkmanagement.v1.Endpoint;
import com.google.cloud.networkmanagement.v1.ReachabilityServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateConnectivityTest {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = args[0];
    String testId = args[1];
    createConnectivityTest(projectId, testId);
  }

  public static void createConnectivityTest(String projectId, String testId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ReachabilityServiceClient client = ReachabilityServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);
      Endpoint source = Endpoint.newBuilder().setIpAddress("10.0.0.1").build();
      Endpoint destination = Endpoint.newBuilder().setIpAddress("10.0.0.2").build();
      ConnectivityTest resource =
          ConnectivityTest.newBuilder()
              .setSource(source)
              .setDestination(destination)
              .setProtocol("TCP")
              .build();

      ConnectivityTest response =
          client.createConnectivityTestAsync(parent, testId, resource).get(5, TimeUnit.MINUTES);

      System.out.println("Connectivity test created: " + response.getName());
    }
  }
}
// [END networkmanagement_v1_reachabilityservice_connectivitytest_create]
