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

// [START container_v1beta1_clustermanager_cluster_get]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.Cluster;
import com.google.container.v1beta1.GetClusterRequest;
import java.io.IOException;

public class GetCluster {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String clusterId = "example-cluster-id";
    getCluster(projectId, locationId, clusterId);
  }

  public static void getCluster(String projectId, String locationId, String clusterId)
      throws IOException {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/clusters/%s", projectId, locationId, clusterId);

      GetClusterRequest request = GetClusterRequest.newBuilder().setName(name).build();

      Cluster response = client.getCluster(request);
      System.out.println("Cluster name: " + response.getName());
      System.out.println("Cluster status: " + response.getStatus());
      System.out.println("Cluster endpoint: " + response.getEndpoint());
    }
  }
}
// [END container_v1beta1_clustermanager_cluster_get]
