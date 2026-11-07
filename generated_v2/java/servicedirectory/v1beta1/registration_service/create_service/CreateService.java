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

package com.google.cloud.servicedirectory.v1beta1;

// [START servicedirectory_v1beta1_registrationservice_service_create]
import com.google.cloud.servicedirectory.v1beta1.NamespaceName;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1beta1.Service;

public class CreateService {

  public static void main(String[] args) throws Exception {
    String serviceId = "example-service-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    createService(serviceId, projectId, locationId, namespaceId);
  }

  public static void createService(
      String serviceId, String projectId, String locationId, String namespaceId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = NamespaceName.of(projectId, locationId, namespaceId).toString();
      Service service = Service.newBuilder().putMetadata("environment", "production").build();

      Service createdService = client.createService(parent, service, serviceId);
      System.out.println("Created service: " + createdService.getName());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_service_create]
