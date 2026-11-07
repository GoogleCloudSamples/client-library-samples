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

// [START gkehub_v1beta1_gkehubmembershipservice_memberships_list]
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.Membership;
import java.io.IOException;

public class ListMemberships {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listMemberships(projectId, locationId);
  }

  public static void listMemberships(String projectId, String locationId) throws Exception {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Membership membership : client.listMemberships(parent).iterateAll()) {
        System.out.println("Membership: " + membership.getName());
      }
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_memberships_list]
