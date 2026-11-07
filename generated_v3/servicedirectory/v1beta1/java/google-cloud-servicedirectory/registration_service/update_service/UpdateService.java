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

// [START servicedirectory_v1beta1_registrationservice_service_update]
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1beta1.Service;
import com.google.cloud.servicedirectory.v1beta1.ServiceName;
import com.google.protobuf.FieldMask;

public class UpdateService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    String serviceId = "example-service-id";
    updateService(projectId, locationId, namespaceId, serviceId);
  }

  public static void updateService(
      String projectId, String locationId, String namespaceId, String serviceId) throws Exception {
    // Initialize client that will be closed when the try block finishes.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      ServiceName serviceName = ServiceName.of(projectId, locationId, namespaceId, serviceId);

      Service service =
          Service.newBuilder()
              .setName(serviceName.toString())
              .putMetadata("status", "updated")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("metadata").build();

      Service updatedService = client.updateService(service, updateMask);
      System.out.println("Updated service: " + updatedService.getName());
      System.out.println("Metadata: " + updatedService.getMetadataMap());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_service_update]
