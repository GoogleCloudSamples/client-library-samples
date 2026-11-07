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

// [START workstations_v1beta_workstations_workstations_list]
import com.google.cloud.workstations.v1beta.Workstation;
import com.google.cloud.workstations.v1beta.WorkstationConfigName;
import com.google.cloud.workstations.v1beta.WorkstationsClient;

public class ListWorkstations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workstationClusterId = "example-cluster-id";
    String workstationConfigId = "example-config-id";
    listWorkstations(projectId, locationId, workstationClusterId, workstationConfigId);
  }

  public static void listWorkstations(
      String projectId,
      String locationId,
      String workstationClusterId,
      String workstationConfigId)
      throws Exception {
    try (WorkstationsClient client = WorkstationsClient.create()) {
      String parent =
          WorkstationConfigName.of(
                  projectId, locationId, workstationClusterId, workstationConfigId)
              .toString();

      for (Workstation workstation : client.listWorkstations(parent).iterateAll()) {
        System.out.println("Workstation name: " + workstation.getName());
      }
    }
  }
}
// [END workstations_v1beta_workstations_workstations_list]
