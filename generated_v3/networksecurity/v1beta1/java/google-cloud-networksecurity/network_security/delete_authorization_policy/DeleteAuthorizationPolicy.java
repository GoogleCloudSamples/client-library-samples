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

package com.google.cloud.networksecurity.v1beta1;

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_delete]
import com.google.cloud.networksecurity.v1beta1.AuthorizationPolicyName;
import com.google.cloud.networksecurity.v1beta1.NetworkSecurityClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteAuthorizationPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String authorizationPolicyId = "example-authorization_policy_id";
    deleteAuthorizationPolicy(projectId, locationId, authorizationPolicyId);
  }

  public static void deleteAuthorizationPolicy(
      String projectId, String locationId, String authorizationPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String name =
          AuthorizationPolicyName.of(projectId, locationId, authorizationPolicyId).toString();
      // DeleteAuthorizationPolicy is a long-running operation; wait for it to complete.
      client.deleteAuthorizationPolicyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted authorization policy: %s%n", name);
    }
  }
}
// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_delete]
