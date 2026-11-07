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

// [START monitoring_v3_servicemonitoringservice_service_update]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.Service;
import com.google.monitoring.v3.ServiceName;
import com.google.monitoring.v3.UpdateServiceRequest;
import com.google.protobuf.FieldMask;

public class UpdateService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String serviceId = "example-service_id";
    updateService(projectId, serviceId);
  }

  public static void updateService(String projectId, String serviceId) throws Exception {
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      Service service =
          Service.newBuilder()
              .setName(ServiceName.of(projectId, serviceId).toString())
              .setDisplayName("Updated Service Name")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      UpdateServiceRequest request =
          UpdateServiceRequest.newBuilder()
              .setService(service)
              .setUpdateMask(updateMask)
              .build();

      Service response = client.updateService(request);
      System.out.println("Updated service: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_update]
