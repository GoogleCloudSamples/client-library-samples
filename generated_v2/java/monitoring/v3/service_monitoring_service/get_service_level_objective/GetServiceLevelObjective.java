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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.ServiceLevelObjective;
import com.google.monitoring.v3.ServiceLevelObjectiveName;

public class GetServiceLevelObjective {

  public static void main(String[] args) throws Exception {
    String serviceId = "example-service_id";
    String projectId = "example-project_id";
    String serviceLevelObjectiveId = "example-service_level_objective_id";
    getServiceLevelObjective(serviceId, projectId, serviceLevelObjectiveId);
  }

  public static void getServiceLevelObjective(
      String serviceId, String projectId, String serviceLevelObjectiveId) throws Exception {
    // Initialize the client using Application Default Credentials
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      String name =
          ServiceLevelObjectiveName.of(projectId, serviceId, serviceLevelObjectiveId).toString();

      ServiceLevelObjective response = client.getServiceLevelObjective(name);

      System.out.println("Service Level Objective: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
      System.out.println("Goal: " + response.getGoal());
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
