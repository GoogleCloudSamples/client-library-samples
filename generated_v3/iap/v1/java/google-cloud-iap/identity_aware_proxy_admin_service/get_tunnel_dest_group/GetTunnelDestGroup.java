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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_get]
import com.google.cloud.iap.v1.GetTunnelDestGroupRequest;
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.cloud.iap.v1.TunnelDestGroup;
import com.google.cloud.iap.v1.TunnelDestGroupName;
import java.io.IOException;

public class GetTunnelDestGroup {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    String destGroupId = "example-dest_group_id";
    getTunnelDestGroup(locationId, projectId, destGroupId);
  }

  public static void getTunnelDestGroup(
      String locationId, String projectId, String destGroupId) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client =
        IdentityAwareProxyAdminServiceClient.create()) {
      String name =
          TunnelDestGroupName.of(projectId, locationId, destGroupId).toString();
      GetTunnelDestGroupRequest request =
          GetTunnelDestGroupRequest.newBuilder().setName(name).build();

      TunnelDestGroup response = client.getTunnelDestGroup(request);

      System.out.println("Retrieved destination group: " + response.getName());
      System.out.println("CIDRs: " + response.getCidrsList());
      System.out.println("FQDNs: " + response.getFqdnsList());
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_get]
