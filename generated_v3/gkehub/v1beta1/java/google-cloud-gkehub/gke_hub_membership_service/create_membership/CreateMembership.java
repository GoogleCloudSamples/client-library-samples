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

package com.google.cloud.gkehub.v1beta1;

// [START gkehub_v1beta1_gkehubmembershipservice_membership_create]
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.Membership;
import java.util.concurrent.TimeUnit;

public class CreateMembership {

  public static void createMembership(String projectId, String locationId, String membershipId)
      throws Exception {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Membership resource = Membership.newBuilder().build();

      Membership response =
          client.createMembershipAsync(parent, resource, membershipId).get(5, TimeUnit.MINUTES);

      System.out.println("Created membership: " + response.getName());
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_membership_create]
