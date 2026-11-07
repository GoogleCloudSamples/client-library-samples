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

// [START networksecurity_v1_networksecurity_authorizationpolicies_list]
import com.google.cloud.networksecurity.v1.AuthorizationPolicy;
import com.google.cloud.networksecurity.v1.LocationName;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;

public class ListAuthorizationPolicies {

  public static void listAuthorizationPolicies(String projectId, String locationId)
      throws IOException {
    if (locationId == null || locationId.isEmpty()) {
      locationId = "global";
    }

    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (AuthorizationPolicy policy : client.listAuthorizationPolicies(parent).iterateAll()) {
        System.out.println("Authorization policy: " + policy.getName());
      }
    }
  }
}
// [END networksecurity_v1_networksecurity_authorizationpolicies_list]
