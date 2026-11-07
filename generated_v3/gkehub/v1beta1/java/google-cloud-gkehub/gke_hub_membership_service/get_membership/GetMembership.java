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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_get]
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.Membership;
import com.google.cloud.gkehub.v1beta1.MembershipName;
import java.io.IOException;

public class GetMembership {

  public static void getMembership(String projectId, String locationId, String membershipId)
      throws IOException {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String name = MembershipName.of(projectId, locationId, membershipId).toString();
      Membership response = client.getMembership(name);
      System.out.println("Membership name: " + response.getName());
      System.out.println("Membership description: " + response.getDescription());
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_membership_get]
