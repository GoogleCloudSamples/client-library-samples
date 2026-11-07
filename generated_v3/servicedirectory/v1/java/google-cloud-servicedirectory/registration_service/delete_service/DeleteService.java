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

package com.google.cloud.servicedirectory.v1;

// [START servicedirectory_v1_registrationservice_service_delete]
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1.ServiceName;

public class DeleteService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    deleteService(projectId, locationId, namespaceId, serviceId);
  }

  public static void deleteService(
      String projectId, String locationId, String namespaceId, String serviceId)
      throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String name = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();
      client.deleteService(name);
      System.out.println("Deleted service: " + name);
    }
  }
}
// [END servicedirectory_v1_registrationservice_service_delete]
