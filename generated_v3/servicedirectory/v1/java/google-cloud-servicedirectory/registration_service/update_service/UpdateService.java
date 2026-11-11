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

// [START servicedirectory_v1_registrationservice_service_update]
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1.Service;
import com.google.cloud.servicedirectory.v1.ServiceName;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    updateService(projectId, locationId, namespaceId, serviceId);
  }

  public static void updateService(
      String projectId, String locationId, String namespaceId, String serviceId)
      throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      Service service =
          Service.newBuilder()
              .setName(ServiceName.of(projectId, locationId, namespaceId, serviceId).toString())
              .putAnnotations("env", "production")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("annotations").build();

      Service updatedService = client.updateService(service, updateMask);

      System.out.println("Updated service: " + updatedService.getName());
      System.out.println("Annotations: " + updatedService.getAnnotationsMap());
    }
  }
}
// [END servicedirectory_v1_registrationservice_service_update]
