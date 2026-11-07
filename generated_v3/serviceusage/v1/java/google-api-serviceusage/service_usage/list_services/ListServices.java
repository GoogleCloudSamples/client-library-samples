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

// [START serviceusage_v1_serviceusage_services_list]
import com.google.api.serviceusage.v1.ListServicesRequest;
import com.google.api.serviceusage.v1.Service;
import com.google.api.serviceusage.v1.ServiceUsageClient;
import java.io.IOException;

public class ListServices {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    listServices(projectId);
  }

  public static void listServices(String projectId) throws IOException {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String parent = "projects/" + projectId;

      ListServicesRequest request =
          ListServicesRequest.newBuilder()
              .setParent(parent)
              .setFilter("state:ENABLED")
              .build();

      for (Service service : client.listServices(request).iterateAll()) {
        System.out.printf("Service: %s, State: %s%n", service.getName(), service.getState());
      }
    }
  }
}
// [END serviceusage_v1_serviceusage_services_list]
