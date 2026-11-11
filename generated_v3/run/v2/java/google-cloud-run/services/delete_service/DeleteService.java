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

// [START run_v2_services_service_delete]
import com.google.cloud.run.v2.Service;
import com.google.cloud.run.v2.ServiceName;
import com.google.cloud.run.v2.ServicesClient;

public class DeleteService {

  public static void deleteService(String projectId, String locationId, String serviceId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ServicesClient client = ServicesClient.create()) {
      String name = ServiceName.of(projectId, locationId, serviceId).toString();

      Service service = client.deleteServiceAsync(name).get();
      System.out.println("Deleted service: " + service.getName());
    }
  }
}
// [END run_v2_services_service_delete]
