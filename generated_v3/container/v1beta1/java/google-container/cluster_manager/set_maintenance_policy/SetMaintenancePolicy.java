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

// [START container_v1beta1_clustermanager_set_maintenance_policy]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.Cluster;
import com.google.container.v1beta1.DailyMaintenanceWindow;
import com.google.container.v1beta1.MaintenancePolicy;
import com.google.container.v1beta1.MaintenanceWindow;
import com.google.container.v1beta1.Operation;

public class SetMaintenancePolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String zone = "example-zone";
    String clusterId = "example-cluster-id";
    setMaintenancePolicy(projectId, zone, clusterId);
  }

  public static void setMaintenancePolicy(String projectId, String zone, String clusterId)
      throws Exception {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      // SetMaintenancePolicy performs a full replacement, requiring the current resource version.
      Cluster existingCluster = client.getCluster(projectId, zone, clusterId);
      String resourceVersion = existingCluster.getMaintenancePolicy().getResourceVersion();

      DailyMaintenanceWindow dailyMaintenanceWindow =
          DailyMaintenanceWindow.newBuilder()
              .setStartTime("04:00")
              .build();

      MaintenanceWindow window =
          MaintenanceWindow.newBuilder()
              .setDailyMaintenanceWindow(dailyMaintenanceWindow)
              .build();

      MaintenancePolicy maintenancePolicy =
          MaintenancePolicy.newBuilder()
              .setWindow(window)
              .setResourceVersion(resourceVersion)
              .build();

      Operation operation =
          client.setMaintenancePolicy(projectId, zone, clusterId, maintenancePolicy);
      System.out.println("Set maintenance policy operation initiated: " + operation.getName());
    }
  }
}
// [END container_v1beta1_clustermanager_set_maintenance_policy]
