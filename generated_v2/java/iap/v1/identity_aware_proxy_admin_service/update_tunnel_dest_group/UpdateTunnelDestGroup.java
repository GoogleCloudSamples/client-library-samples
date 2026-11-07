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

package com.google.cloud.iap.v1;

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.cloud.iap.v1.TunnelDestGroup;
import com.google.protobuf.FieldMask;

public class UpdateTunnelDestGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String destGroupId = "example-dest-group-id";
    updateTunnelDestGroup(projectId, locationId, destGroupId);
  }

  public static void updateTunnelDestGroup(String projectId, String locationId, String destGroupId)
      throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/iap_tunnel/locations/%s/destGroups/%s",
              projectId, locationId, destGroupId);
      TunnelDestGroup tunnelDestGroup =
          TunnelDestGroup.newBuilder()
              .setName(name)
              .addCidrs("10.0.0.1/32")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("cidrs").build();

      TunnelDestGroup response = client.updateTunnelDestGroup(tunnelDestGroup, updateMask);
      System.out.println("Updated tunnel destination group: " + response.getName());
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
