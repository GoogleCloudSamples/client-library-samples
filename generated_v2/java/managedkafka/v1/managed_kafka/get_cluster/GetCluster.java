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

package com.google.cloud.managedkafka.v1;

// [START managedkafka_v1_managedkafka_cluster_get]
import com.google.cloud.managedkafka.v1.Cluster;
import com.google.cloud.managedkafka.v1.ClusterName;
import com.google.cloud.managedkafka.v1.ManagedKafkaClient;

public class GetCluster {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String clusterId = "example-cluster_id";
    getCluster(projectId, locationId, clusterId);
  }

  public static void getCluster(String projectId, String locationId, String clusterId)
      throws Exception {
    try (ManagedKafkaClient client = ManagedKafkaClient.create()) {
      String name = ClusterName.of(projectId, locationId, clusterId).toString();
      Cluster response = client.getCluster(name);
      System.out.println("Retrieved cluster: " + response.getName());
      System.out.println("Cluster state: " + response.getState());
    }
  }
}
// [END managedkafka_v1_managedkafka_cluster_get]
