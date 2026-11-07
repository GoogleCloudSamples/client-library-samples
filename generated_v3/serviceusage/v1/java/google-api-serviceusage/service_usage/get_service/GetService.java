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

package com.google.cloud.serviceusage.v1;

// [START serviceusage_v1_serviceusage_service_get]
import com.google.api.serviceusage.v1.GetServiceRequest;
import com.google.api.serviceusage.v1.Service;
import com.google.api.serviceusage.v1.ServiceUsageClient;
import java.io.IOException;

public class GetService {

  public static void main(String[] args) throws IOException {
    getService();
  }

  public static void getService() throws IOException {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getProperty("google.cloud.project");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String serviceName = "compute.googleapis.com";
    String name = String.format("projects/%s/services/%s", projectId, serviceName);

    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      GetServiceRequest request = GetServiceRequest.newBuilder()
          .setName(name)
          .build();

      Service response = client.getService(request);
      System.out.println("Service name: " + response.getName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END serviceusage_v1_serviceusage_service_get]
