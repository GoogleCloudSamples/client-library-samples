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

package com.google.cloud.serviceusage.v1beta1;

// [START serviceusage_v1beta1_serviceusage_service_get]
import com.google.api.serviceusage.v1beta1.GetServiceRequest;
import com.google.api.serviceusage.v1beta1.Service;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.io.IOException;

public class GetService {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String serviceId = "example-service-id";
    getService(projectId, serviceId);
  }

  public static void getService(String projectId, String serviceId) throws IOException {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String name = String.format("projects/%s/services/%s", projectId, serviceId);
      GetServiceRequest request = GetServiceRequest.newBuilder().setName(name).build();
      Service service = client.getService(request);

      System.out.println("Service: " + service.getName());
      System.out.println("State: " + service.getState());
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_service_get]
