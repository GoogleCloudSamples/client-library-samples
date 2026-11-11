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

// [START servicedirectory_v1beta1_registrationservice_endpoint_get]
import com.google.cloud.servicedirectory.v1beta1.Endpoint;
import com.google.cloud.servicedirectory.v1beta1.EndpointName;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import java.io.IOException;

public class GetEndpoint {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    String endpointId = "example-endpoint_id";
    getEndpoint(projectId, locationId, namespaceId, serviceId, endpointId);
  }

  public static void getEndpoint(
      String projectId,
      String locationId,
      String namespaceId,
      String serviceId,
      String endpointId)
      throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String name =
          EndpointName.of(projectId, locationId, namespaceId, serviceId, endpointId).toString();
      Endpoint endpoint = client.getEndpoint(name);
      System.out.println("Endpoint: " + endpoint.getName());
      System.out.println("Address: " + endpoint.getAddress());
      System.out.println("Port: " + endpoint.getPort());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_endpoint_get]
