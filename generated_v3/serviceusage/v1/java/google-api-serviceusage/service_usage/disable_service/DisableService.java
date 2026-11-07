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

// [START serviceusage_v1_serviceusage_disable_service]
import com.google.api.serviceusage.v1.DisableServiceRequest;
import com.google.api.serviceusage.v1.DisableServiceResponse;
import com.google.api.serviceusage.v1.ServiceUsageClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DisableService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String serviceId = "example-service-id";
    disableService(projectId, serviceId);
  }

  public static void disableService(String projectId, String serviceId) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String name = String.format("projects/%s/services/%s", projectId, serviceId);

      DisableServiceRequest request =
          DisableServiceRequest.newBuilder()
              .setName(name)
              .build();

      // DisableService is a long-running operation.
      DisableServiceResponse response =
          client.disableServiceAsync(request).get(3, TimeUnit.MINUTES);
      System.out.println("Disabled service: " + response.getService().getName());
    }
  }
}
// [END serviceusage_v1_serviceusage_disable_service]
