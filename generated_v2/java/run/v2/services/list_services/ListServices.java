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

package com.google.cloud.run.v2;

// [START run_v2_services_services_list]
import com.google.cloud.run.v2.ListServicesRequest;
import com.google.cloud.run.v2.Service;
import com.google.cloud.run.v2.ServicesClient;

public class ListServices {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listServices(projectId, locationId);
  }

  public static void listServices(String projectId, String locationId) throws Exception {
    try (ServicesClient client = ServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListServicesRequest request =
          ListServicesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (Service service : client.listServices(request).iterateAll()) {
        System.out.println("Service: " + service.getName());
        System.out.println("URI: " + service.getUri());
      }
    }
  }
}
// [END run_v2_services_services_list]
