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

// [START servicedirectory_v1beta1_registrationservice_endpoint_update]
import com.google.cloud.servicedirectory.v1beta1.Endpoint;
import com.google.cloud.servicedirectory.v1beta1.EndpointName;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import com.google.protobuf.FieldMask;

public class UpdateEndpoint {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    String serviceId = "example-service-id";
    String endpointId = "example-endpoint-id";
    updateEndpoint(projectId, locationId, namespaceId, serviceId, endpointId);
  }

  public static void updateEndpoint(
      String projectId,
      String locationId,
      String namespaceId,
      String serviceId,
      String endpointId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("port").build();
      Endpoint endpoint =
          Endpoint.newBuilder()
              .setName(
                  EndpointName.of(projectId, locationId, namespaceId, serviceId, endpointId)
                      .toString())
              .setPort(8080)
              .build();

      Endpoint response = client.updateEndpoint(endpoint, updateMask);
      System.out.println("Updated endpoint: " + response.getName());
      System.out.println("Updated port: " + response.getPort());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_endpoint_update]
