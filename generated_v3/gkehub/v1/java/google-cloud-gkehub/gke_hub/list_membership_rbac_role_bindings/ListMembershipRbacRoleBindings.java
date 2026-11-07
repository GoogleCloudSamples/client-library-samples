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

// [START gkehub_v1_gkehub_membershiprbacrolebindings_list]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.MembershipName;
import com.google.cloud.gkehub.v1.RBACRoleBinding;

public class ListMembershipRbacRoleBindings {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String membershipId = "example-membership_id";
    listMembershipRbacRoleBindings(projectId, locationId, membershipId);
  }

  public static void listMembershipRbacRoleBindings(
      String projectId, String locationId, String membershipId) throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent = MembershipName.of(projectId, locationId, membershipId).toString();

      // Retrieve and print all RBAC role bindings for the specified membership.
      for (RBACRoleBinding roleBinding :
          client.listMembershipRBACRoleBindings(parent).iterateAll()) {
        System.out.println("Role binding name: " + roleBinding.getName());
      }
    }
  }
}
// [END gkehub_v1_gkehub_membershiprbacrolebindings_list]
