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

// [START servicedirectory_v1_registrationservice_endpoint_create]
import com.google.cloud.servicedirectory.v1.Endpoint;
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1.ServiceName;

public class CreateEndpoint {

  public static void main(String[] args) throws Exception {
    String endpointId = "example-endpoint_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    createEndpoint(endpointId, projectId, locationId, namespaceId, serviceId);
  }

  public static void createEndpoint(
      String endpointId,
      String projectId,
      String locationId,
      String namespaceId,
      String serviceId)
      throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();
      Endpoint endpoint =
          Endpoint.newBuilder()
              .setAddress("10.0.0.1")
              .setPort(80)
              .build();

      Endpoint response = client.createEndpoint(parent, endpoint, endpointId);
      System.out.println("Created endpoint: " + response.getName());
    }
  }
}
// [END servicedirectory_v1_registrationservice_endpoint_create]
