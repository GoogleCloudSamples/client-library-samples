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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_update]
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.Membership;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateMembership {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String membershipId = "example-membership-id";
    String locationId = "example-location-id";
    updateMembership(projectId, membershipId, locationId);
  }

  public static void updateMembership(String projectId, String membershipId, String locationId)
      throws Exception {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/memberships/%s", projectId, locationId, membershipId);
      Membership resource =
          Membership.newBuilder().setDescription("Updated membership description").build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      Membership response =
          client.updateMembershipAsync(name, resource, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated membership: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_membership_update]
