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

package com.google.cloud.workstations.v1beta;

// [START workstations_v1beta_workstations_workstation_update]
import com.google.cloud.workstations.v1beta.Workstation;
import com.google.cloud.workstations.v1beta.WorkstationName;
import com.google.cloud.workstations.v1beta.WorkstationsClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateWorkstation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String workstationClusterId = "example-workstation_cluster_id";
    String workstationConfigId = "example-workstation_config_id";
    String workstationId = "example-workstation_id";
    updateWorkstation(
        projectId, locationId, workstationClusterId, workstationConfigId, workstationId);
  }

  public static void updateWorkstation(
      String projectId,
      String locationId,
      String workstationClusterId,
      String workstationConfigId,
      String workstationId)
      throws Exception {
    try (WorkstationsClient client = WorkstationsClient.create()) {
      Workstation workstation =
          Workstation.newBuilder()
              .setName(
                  WorkstationName.of(
                          projectId,
                          locationId,
                          workstationClusterId,
                          workstationConfigId,
                          workstationId)
                      .toString())
              .setDisplayName("Updated Workstation")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Long-running operations require polling or waiting for completion.
      Workstation response =
          client.updateWorkstationAsync(workstation, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated workstation: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END workstations_v1beta_workstations_workstation_update]
