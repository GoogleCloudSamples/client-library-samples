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

// [START servicedirectory_v1beta1_registrationservice_service_get]
import com.google.cloud.servicedirectory.v1beta1.GetServiceRequest;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import com.google.cloud.servicedirectory.v1beta1.Service;
import com.google.cloud.servicedirectory.v1beta1.ServiceName;

public class GetService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    getService(projectId, locationId, namespaceId, serviceId);
  }

  public static void getService(
      String projectId, String locationId, String namespaceId, String serviceId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String name = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();

      GetServiceRequest request = GetServiceRequest.newBuilder().setName(name).build();
      Service service = client.getService(request);

      System.out.println("Service name: " + service.getName());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_service_get]
