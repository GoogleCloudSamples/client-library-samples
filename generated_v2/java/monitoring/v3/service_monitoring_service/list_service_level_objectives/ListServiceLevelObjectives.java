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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_servicemonitoringservice_servicelevelobjectives_list]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.ServiceLevelObjective;
import com.google.monitoring.v3.ServiceName;

public class ListServiceLevelObjectives {

  public static void main(String[] args) throws Exception {
    String serviceId = "example-service_id";
    String projectId = "example-project_id";
    listServiceLevelObjectives(serviceId, projectId);
  }

  public static void listServiceLevelObjectives(String serviceId, String projectId)
      throws Exception {
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      String parent = ServiceName.of(projectId, serviceId).toString();
      for (ServiceLevelObjective serviceLevelObjective :
          client.listServiceLevelObjectives(parent).iterateAll()) {
        System.out.println("Service Level Objective: " + serviceLevelObjective.getName());
        System.out.println("Display Name: " + serviceLevelObjective.getDisplayName());
        System.out.println("Goal: " + serviceLevelObjective.getGoal());
      }
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjectives_list]
