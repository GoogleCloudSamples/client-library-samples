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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.cloud.iap.v1.TunnelDestGroup;
import java.io.IOException;

public class CreateTunnelDestGroup {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    String tunnelDestGroupId = "example-tunnel_dest_group_id";
    createTunnelDestGroup(locationId, projectId, tunnelDestGroupId);
  }

  public static void createTunnelDestGroup(
      String locationId, String projectId, String tunnelDestGroupId) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      String parent = String.format("projects/%s/iap_tunnel/locations/%s", projectId, locationId);
      TunnelDestGroup tunnelDestGroup =
          TunnelDestGroup.newBuilder().addCidrs("10.0.0.1/32").build();

      TunnelDestGroup response =
          client.createTunnelDestGroup(parent, tunnelDestGroup, tunnelDestGroupId);

      System.out.println("Created tunnel destination group: " + response.getName());
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
