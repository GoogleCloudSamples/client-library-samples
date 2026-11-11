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

// [START servicedirectory_v1beta1_registrationservice_endpoint_delete]
import com.google.cloud.servicedirectory.v1beta1.EndpointName;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;

public class DeleteEndpoint {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    String serviceId = "example-service-id";
    String endpointId = "example-endpoint-id";
    deleteEndpoint(projectId, locationId, namespaceId, serviceId, endpointId);
  }

  public static void deleteEndpoint(
      String projectId, String locationId, String namespaceId, String serviceId, String endpointId)
      throws Exception {
    // Initialize client that will be closed when the block terminates.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String name =
          EndpointName.of(projectId, locationId, namespaceId, serviceId, endpointId).toString();

      client.deleteEndpoint(name);
      System.out.println("Deleted endpoint: " + name);
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_endpoint_delete]
