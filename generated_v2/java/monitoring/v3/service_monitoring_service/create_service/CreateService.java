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

// [START monitoring_v3_servicemonitoringservice_service_create]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.CreateServiceRequest;
import com.google.monitoring.v3.Service;

public class CreateService {

  public static void main(String[] args) throws Exception {
    String serviceId = "example-service-id";
    String projectId = "example-project-id";
    createService(serviceId, projectId);
  }

  public static void createService(String serviceId, String projectId) throws Exception {
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      Service service =
          Service.newBuilder()
              .setDisplayName("Custom Monitoring Service")
              .setCustom(Service.Custom.newBuilder().build())
              .build();

      CreateServiceRequest request =
          CreateServiceRequest.newBuilder()
              .setParent(parent)
              .setServiceId(serviceId)
              .setService(service)
              .build();

      Service createdService = client.createService(request);
      System.out.println("Created service: " + createdService.getName());
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_create]
