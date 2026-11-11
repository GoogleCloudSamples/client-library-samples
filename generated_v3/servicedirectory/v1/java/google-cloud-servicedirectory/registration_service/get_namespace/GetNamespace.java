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

// [START servicedirectory_v1_registrationservice_namespace_get]
import com.google.cloud.servicedirectory.v1.Namespace;
import com.google.cloud.servicedirectory.v1.NamespaceName;
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import java.io.IOException;

public class GetNamespace {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    getNamespace(projectId, locationId, namespaceId);
  }

  public static void getNamespace(String projectId, String locationId, String namespaceId)
      throws Exception {
    // Initialize client that will be used to send requests.
    // Client instances can be reused for multiple requests and are safe for concurrent access.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String name = NamespaceName.of(projectId, locationId, namespaceId).toString();
      Namespace namespace = client.getNamespace(name);

      System.out.println("Retrieved namespace: " + namespace.getName());
    }
  }
}
// [END servicedirectory_v1_registrationservice_namespace_get]
