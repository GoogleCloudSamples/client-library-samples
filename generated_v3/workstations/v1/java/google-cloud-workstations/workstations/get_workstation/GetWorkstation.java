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

// [START workstations_v1_workstations_workstation_get]
import com.google.cloud.workstations.v1.Workstation;
import com.google.cloud.workstations.v1.WorkstationName;
import com.google.cloud.workstations.v1.WorkstationsClient;
import java.io.IOException;

public class GetWorkstation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String workstationClusterId = "example-workstation_cluster_id";
    String workstationConfigId = "example-workstation_config_id";
    String workstationId = "example-workstation_id";
    getWorkstation(projectId, locationId, workstationClusterId, workstationConfigId, workstationId);
  }

  public static void getWorkstation(
      String projectId,
      String locationId,
      String workstationClusterId,
      String workstationConfigId,
      String workstationId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (WorkstationsClient client = WorkstationsClient.create()) {
      String name =
          WorkstationName.of(
                  projectId, locationId, workstationClusterId, workstationConfigId, workstationId)
              .toString();

      Workstation workstation = client.getWorkstation(name);
      System.out.println("Workstation name: " + workstation.getName());
      System.out.println("Workstation state: " + workstation.getState());
      System.out.println("Workstation host: " + workstation.getHost());
    }
  }
}
// [END workstations_v1_workstations_workstation_get]
