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

package com.google.cloud.gkehub.v1;

// [START gkehub_v1_gkehub_membershipbinding_create]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.MembershipBinding;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateMembershipBinding {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String membershipId = "example-membership_id";
    String membershipBindingId = "example-membership_binding_id";
    String scopeId = "example-scope_id";
    createMembershipBinding(projectId, locationId, membershipId, membershipBindingId, scopeId);
  }

  public static void createMembershipBinding(
      String projectId,
      String locationId,
      String membershipId,
      String membershipBindingId,
      String scopeId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/memberships/%s", projectId, locationId, membershipId);
      MembershipBinding membershipBinding =
          MembershipBinding.newBuilder()
              .setScope(
                  String.format(
                      "projects/%s/locations/%s/scopes/%s", projectId, locationId, scopeId))
              .build();

      MembershipBinding response =
          client
              .createMembershipBindingAsync(parent, membershipBinding, membershipBindingId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created membership binding: " + response.getName());
    }
  }
}
// [END gkehub_v1_gkehub_membershipbinding_create]
