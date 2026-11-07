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

// [START workstations_v1beta_workstations_workstationconfig_get]
import com.google.cloud.workstations.v1beta.WorkstationConfig;
import com.google.cloud.workstations.v1beta.WorkstationConfigName;
import com.google.cloud.workstations.v1beta.WorkstationsClient;
import java.io.IOException;

public class GetWorkstationConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String workstationClusterId = "example-workstation_cluster_id";
    String workstationConfigId = "example-workstation_config_id";
    getWorkstationConfig(projectId, locationId, workstationClusterId, workstationConfigId);
  }

  public static void getWorkstationConfig(
      String projectId,
      String locationId,
      String workstationClusterId,
      String workstationConfigId)
      throws Exception {
    try (WorkstationsClient client = WorkstationsClient.create()) {
      String name =
          WorkstationConfigName.of(
                  projectId, locationId, workstationClusterId, workstationConfigId)
              .toString();

      WorkstationConfig workstationConfig = client.getWorkstationConfig(name);

      System.out.println("Retrieved workstation configuration: " + workstationConfig.getName());
    }
  }
}
// [END workstations_v1beta_workstations_workstationconfig_get]
