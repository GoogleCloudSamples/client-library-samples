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

// [START serviceusage_v1_serviceusage_enable_service]
import com.google.api.serviceusage.v1.EnableServiceRequest;
import com.google.api.serviceusage.v1.EnableServiceResponse;
import com.google.api.serviceusage.v1.ServiceUsageClient;

public class EnableService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String serviceId = "example-service-id";
    enableService(projectId, serviceId);
  }

  public static void enableService(String projectId, String serviceId) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String name = String.format("projects/%s/services/%s", projectId, serviceId);
      EnableServiceRequest request = EnableServiceRequest.newBuilder()
          .setName(name)
          .build();

      // EnableService is a long-running operation; wait for it to complete.
      EnableServiceResponse response = client.enableServiceAsync(request).get();
      System.out.println("Enabled service: " + response.getService().getName());
    }
  }
}
// [END serviceusage_v1_serviceusage_enable_service]
