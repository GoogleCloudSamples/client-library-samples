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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_networksecurity_gatewaysecuritypolicy_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.networksecurity.v1.GatewaySecurityPolicy;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateGatewaySecurityPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String gatewaySecurityPolicyId = "example-gateway-security-policy-id";
    createGatewaySecurityPolicy(projectId, locationId, gatewaySecurityPolicyId);
  }

  public static void createGatewaySecurityPolicy(
      String projectId, String locationId, String gatewaySecurityPolicyId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      GatewaySecurityPolicy gatewaySecurityPolicy =
          GatewaySecurityPolicy.newBuilder()
              .setDescription("Example Gateway Security Policy")
              .build();

      try {
        // Wait for the long-running operation to complete.
        GatewaySecurityPolicy response =
            client
                .createGatewaySecurityPolicyAsync(
                    parent, gatewaySecurityPolicy, gatewaySecurityPolicyId)
                .get(3, TimeUnit.MINUTES);

        System.out.println("Created gateway security policy: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Quota exceeded for gateway security policies in " + locationId);
        } else {
          throw e;
        }
      } catch (ResourceExhaustedException e) {
        System.out.println("Quota exceeded for gateway security policies in " + locationId);
      }
    }
  }
}
// [END networksecurity_v1_networksecurity_gatewaysecuritypolicy_create]
