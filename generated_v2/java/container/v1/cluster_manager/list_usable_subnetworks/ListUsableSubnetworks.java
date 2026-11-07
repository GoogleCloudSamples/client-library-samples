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

package com.google.cloud.container.v1;

// [START container_v1_clustermanager_usablesubnetworks_list]
import com.google.cloud.container.v1.ClusterManagerClient;
import com.google.container.v1.ListUsableSubnetworksRequest;
import com.google.container.v1.UsableSubnetwork;

public class ListUsableSubnetworks {

  public static void main(String[] args) throws Exception {
    // Project ID for which usable subnetworks are queried.
    String projectId = "example-project-id";
    listUsableSubnetworks(projectId);
  }

  public static void listUsableSubnetworks(String projectId) throws Exception {
    // Initialize the client. This client can be reused across multiple requests.
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String parent = String.format("projects/%s", projectId);

      ListUsableSubnetworksRequest request =
          ListUsableSubnetworksRequest.newBuilder().setParent(parent).build();

      for (UsableSubnetwork subnetwork : client.listUsableSubnetworks(request).iterateAll()) {
        System.out.printf(
            "Subnetwork: %s, Network: %s, IP CIDR Range: %s%n",
            subnetwork.getSubnetwork(), subnetwork.getNetwork(), subnetwork.getIpCidrRange());
      }
    }
  }
}
// [END container_v1_clustermanager_usablesubnetworks_list]
