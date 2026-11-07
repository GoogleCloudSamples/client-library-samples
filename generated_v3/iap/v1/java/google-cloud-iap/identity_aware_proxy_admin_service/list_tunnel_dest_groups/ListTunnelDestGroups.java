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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
import com.google.cloud.iap.v1.IdentityAwareProxyAdminServiceClient;
import com.google.cloud.iap.v1.TunnelDestGroup;
import java.io.IOException;

public class ListTunnelDestGroups {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location-id";
    String projectId = "example-project-id";
    listTunnelDestGroups(locationId, projectId);
  }

  public static void listTunnelDestGroups(String locationId, String projectId) throws Exception {
    try (IdentityAwareProxyAdminServiceClient client = IdentityAwareProxyAdminServiceClient.create()) {
      String parent = String.format("projects/%s/iap_tunnel/locations/%s", projectId, locationId);

      for (TunnelDestGroup group : client.listTunnelDestGroups(parent).iterateAll()) {
        System.out.println("Tunnel destination group name: " + group.getName());
        System.out.println("CIDRs: " + group.getCidrsList());
        System.out.println("FQDNs: " + group.getFqdnsList());
      }
    }
  }
}
// [END iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
