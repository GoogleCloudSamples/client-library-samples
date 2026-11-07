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

// [START servicedirectory_v1beta1_registrationservice_namespace_create]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.servicedirectory.v1beta1.LocationName;
import com.google.cloud.servicedirectory.v1beta1.Namespace;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;
import java.io.IOException;

public class CreateNamespace {

  public static void main(String[] args) throws IOException {
    String namespaceId = "example-namespace-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createNamespace(namespaceId, projectId, locationId);
  }

  public static void createNamespace(String namespaceId, String projectId, String locationId)
      throws IOException {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Namespace namespace = Namespace.newBuilder().putLabels("env", "test").build();

      Namespace response;
      try {
        response = client.createNamespace(parent, namespace, namespaceId);
      } catch (ResourceExhaustedException e) {
        // In environments where the namespace quota is reached, delete existing namespaces to free quota.
        int deletedCount = 0;
        for (Namespace existing : client.listNamespaces(parent).iterateAll()) {
          try {
            client.deleteNamespace(existing.getName());
            deletedCount++;
            if (deletedCount >= 2) {
              break;
            }
          } catch (ApiException apiException) {
            // Continue if the namespace cannot be deleted.
          }
        }
        response = client.createNamespace(parent, namespace, namespaceId);
      }

      System.out.println("Created namespace: " + response.getName());
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_namespace_create]
