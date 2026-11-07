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

// [START networksecurity_v1_networksecurity_authorizationpolicy_create]
import com.google.cloud.networksecurity.v1.AuthorizationPolicy;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateAuthorizationPolicy {

  public static void createAuthorizationPolicy(
      String projectId, String locationId, String authorizationPolicyId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      AuthorizationPolicy authorizationPolicy =
          AuthorizationPolicy.newBuilder()
              .setAction(AuthorizationPolicy.Action.ALLOW)
              .setDescription("Example authorization policy")
              .build();

      AuthorizationPolicy response =
          client
              .createAuthorizationPolicyAsync(parent, authorizationPolicy, authorizationPolicyId)
              .get(3, TimeUnit.MINUTES);

      System.out.println("Created authorization policy: " + response.getName());
    }
  }
}
// [END networksecurity_v1_networksecurity_authorizationpolicy_create]
