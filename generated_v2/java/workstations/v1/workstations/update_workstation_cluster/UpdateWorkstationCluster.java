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

// [START workstations_v1_workstations_workstationcluster_update]
import com.google.cloud.workstations.v1.WorkstationCluster;
import com.google.cloud.workstations.v1.WorkstationClusterName;
import com.google.cloud.workstations.v1.WorkstationsClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateWorkstationCluster {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workstationClusterId = "example-workstation-cluster-id";
    updateWorkstationCluster(projectId, locationId, workstationClusterId);
  }

  public static void updateWorkstationCluster(
      String projectId, String locationId, String workstationClusterId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (WorkstationsClient client = WorkstationsClient.create()) {
      WorkstationCluster workstationCluster =
          WorkstationCluster.newBuilder()
              .setName(
                  WorkstationClusterName.of(projectId, locationId, workstationClusterId).toString())
              .setDisplayName("Updated Cluster Display Name")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Initiate the update operation and wait for completion.
      WorkstationCluster response =
          client
              .updateWorkstationClusterAsync(workstationCluster, updateMask)
              .get(30, TimeUnit.MINUTES);
      System.out.println("Updated workstation cluster: " + response.getName());
    }
  }
}
// [END workstations_v1_workstations_workstationcluster_update]
