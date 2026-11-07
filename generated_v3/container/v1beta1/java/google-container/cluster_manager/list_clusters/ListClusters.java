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

// [START container_v1beta1_clustermanager_clusters_list]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.Cluster;
import com.google.container.v1beta1.ListClustersRequest;
import com.google.container.v1beta1.ListClustersResponse;
import java.io.IOException;

public class ListClusters {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listClusters(projectId, locationId);
  }

  public static void listClusters(String projectId, String locationId) throws IOException {
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);

    // Initialize client within try-with-resources to ensure automatic cleanup
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      ListClustersRequest request = ListClustersRequest.newBuilder().setParent(parent).build();

      ListClustersResponse response = client.listClusters(request);
      for (Cluster cluster : response.getClustersList()) {
        System.out.printf("Cluster name: %s%n", cluster.getName());
      }
    }
  }
}
// [END container_v1beta1_clustermanager_clusters_list]
