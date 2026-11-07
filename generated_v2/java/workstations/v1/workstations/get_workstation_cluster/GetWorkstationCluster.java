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

package com.google.cloud.workstations.v1;

// [START workstations_v1_workstations_workstationcluster_get]
import com.google.cloud.workstations.v1.WorkstationCluster;
import com.google.cloud.workstations.v1.WorkstationClusterName;
import com.google.cloud.workstations.v1.WorkstationsClient;
import java.io.IOException;

public class GetWorkstationCluster {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String workstationClusterId = "example-workstation_cluster_id";
    getWorkstationCluster(projectId, locationId, workstationClusterId);
  }

  public static void getWorkstationCluster(
      String projectId, String locationId, String workstationClusterId) throws IOException {
    try (WorkstationsClient client = WorkstationsClient.create()) {
      String name =
          WorkstationClusterName.of(projectId, locationId, workstationClusterId).toString();

      WorkstationCluster workstationCluster = client.getWorkstationCluster(name);

      System.out.println("Cluster name: " + workstationCluster.getName());
    }
  }
}
// [END workstations_v1_workstations_workstationcluster_get]
