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

// [START servicedirectory_v1beta1_lookupservice_resolve_service]
import com.google.cloud.servicedirectory.v1beta1.Endpoint;
import com.google.cloud.servicedirectory.v1beta1.LookupServiceClient;
import com.google.cloud.servicedirectory.v1beta1.ResolveServiceRequest;
import com.google.cloud.servicedirectory.v1beta1.ResolveServiceResponse;
import com.google.cloud.servicedirectory.v1beta1.ServiceName;
import java.io.IOException;

public class ResolveService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String namespaceId = "example-namespace_id";
    String serviceId = "example-service_id";
    resolveService(projectId, locationId, namespaceId, serviceId);
  }

  public static void resolveService(
      String projectId, String locationId, String namespaceId, String serviceId)
      throws Exception {
    try (LookupServiceClient client = LookupServiceClient.create()) {
      String name = ServiceName.of(projectId, locationId, namespaceId, serviceId).toString();

      ResolveServiceRequest request = ResolveServiceRequest.newBuilder().setName(name).build();

      ResolveServiceResponse response = client.resolveService(request);

      System.out.println("Resolved service: " + response.getService().getName());
      for (Endpoint endpoint : response.getService().getEndpointsList()) {
        System.out.println(
            "Endpoint: "
                + endpoint.getName()
                + ", Address: "
                + endpoint.getAddress()
                + ", Port: "
                + endpoint.getPort());
      }
    }
  }
}
// [END servicedirectory_v1beta1_lookupservice_resolve_service]
