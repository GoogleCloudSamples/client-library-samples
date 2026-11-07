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

// [START servicedirectory_v1_registrationservice_endpoints_list]
import com.google.cloud.servicedirectory.v1.Endpoint;
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1.ServiceName;

public class ListEndpoints {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    String serviceId = "example-service-id";
    listEndpoints(projectId, locationId, namespaceId, serviceId);
  }

  public static void listEndpoints(
      String projectId, String locationId, String namespaceId, String serviceId) throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();

      for (Endpoint endpoint : client.listEndpoints(parent).iterateAll()) {
        System.out.println("Endpoint name: " + endpoint.getName());
        System.out.println("Endpoint address: " + endpoint.getAddress());
        System.out.println("Endpoint port: " + endpoint.getPort());
      }
    }
  }
}
// [END servicedirectory_v1_registrationservice_endpoints_list]
