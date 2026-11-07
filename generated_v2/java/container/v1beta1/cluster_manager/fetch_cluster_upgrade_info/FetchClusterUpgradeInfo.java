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

package com.google.cloud.container.v1beta1;

// [START container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.ClusterUpgradeInfo;

public class FetchClusterUpgradeInfo {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String clusterId = "example-cluster-id";
    fetchClusterUpgradeInfo(projectId, locationId, clusterId);
  }

  public static void fetchClusterUpgradeInfo(String projectId, String locationId, String clusterId)
      throws Exception {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/clusters/%s", projectId, locationId, clusterId);

      ClusterUpgradeInfo response = client.fetchClusterUpgradeInfo(name);
      System.out.println("Cluster upgrade info: " + response);
    }
  }
}
// [END container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
