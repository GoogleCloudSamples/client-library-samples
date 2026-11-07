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

// [START servicedirectory_v1beta1_registrationservice_endpoints_list]
import com.google.cloud.servicedirectory.v1beta1.Endpoint;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1beta1.ServiceName;

public class ListEndpoints {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    String serviceId = "example-service-id";
    listEndpoints(projectId, locationId, namespaceId, serviceId);
  }

  public static void listEndpoints(
      String projectId, String locationId, String namespaceId, String serviceId)
      throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();
      for (Endpoint endpoint : client.listEndpoints(parent).iterateAll()) {
        System.out.println("Endpoint: " + endpoint.getName());
        System.out.println("Address: " + endpoint.getAddress());
        System.out.println("Port: " + endpoint.getPort());
      }
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_endpoints_list]
