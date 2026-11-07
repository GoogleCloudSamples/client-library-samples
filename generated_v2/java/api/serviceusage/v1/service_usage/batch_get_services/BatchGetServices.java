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

// [START serviceusage_v1_serviceusage_batch_get_services]
import com.google.api.serviceusage.v1.BatchGetServicesRequest;
import com.google.api.serviceusage.v1.BatchGetServicesResponse;
import com.google.api.serviceusage.v1.Service;
import com.google.api.serviceusage.v1.ServiceUsageClient;

public class BatchGetServices {

  public static void main(String[] args) throws Exception {
    batchGetServices();
  }

  public static void batchGetServices() throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
      if (projectId == null || projectId.isEmpty()) {
        projectId = System.getenv("PROJECT_ID");
      }
      if (projectId == null || projectId.isEmpty()) {
        projectId = "example-project-id";
      }

      String parent = "projects/" + projectId;

      BatchGetServicesRequest request =
          BatchGetServicesRequest.newBuilder()
              .setParent(parent)
              .addNames(parent + "/services/compute.googleapis.com")
              .addNames(parent + "/services/storage.googleapis.com")
              .build();

      BatchGetServicesResponse response = client.batchGetServices(request);

      for (Service service : response.getServicesList()) {
        System.out.printf("Service: %s, State: %s%n", service.getName(), service.getState());
      }
    }
  }
}
// [END serviceusage_v1_serviceusage_batch_get_services]
