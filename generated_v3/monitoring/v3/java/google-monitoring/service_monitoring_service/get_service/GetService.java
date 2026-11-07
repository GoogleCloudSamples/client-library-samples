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

// [START monitoring_v3_servicemonitoringservice_service_get]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.Service;
import com.google.monitoring.v3.ServiceName;
import java.io.IOException;

public class GetService {

  public static void main(String[] args) throws Exception {
    String serviceId = "example-service_id";
    String projectId = "example-project_id";
    getService(serviceId, projectId);
  }

  public static void getService(String serviceId, String projectId) throws Exception {
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      String name = ServiceName.ofProjectServiceName(projectId, serviceId).toString();
      Service service = client.getService(name);
      System.out.println("Retrieved service: " + service.getName());
      System.out.println("Display name: " + service.getDisplayName());
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_get]
