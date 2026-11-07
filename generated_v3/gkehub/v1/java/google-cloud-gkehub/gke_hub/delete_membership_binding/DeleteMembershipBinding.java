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

// [START gkehub_v1_gkehub_membershipbinding_delete]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.MembershipBindingName;
import java.util.concurrent.TimeUnit;

public class DeleteMembershipBinding {

  public static void deleteMembershipBinding(
      String projectId, String locationId, String membershipId, String bindingId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String name =
          MembershipBindingName.of(projectId, locationId, membershipId, bindingId).toString();

      // Wait for the long-running operation to complete.
      client.deleteMembershipBindingAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted membership binding: " + name);
    }
  }
}
// [END gkehub_v1_gkehub_membershipbinding_delete]
