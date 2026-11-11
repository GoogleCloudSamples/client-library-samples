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

// [START servicedirectory_v1beta1_registrationservice_namespaces_list]
import com.google.cloud.servicedirectory.v1beta1.LocationName;
import com.google.cloud.servicedirectory.v1beta1.Namespace;
import com.google.cloud.servicedirectory.v1beta1.RegistrationServiceClient;

public class ListNamespaces {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listNamespaces(projectId, locationId);
  }

  public static void listNamespaces(String projectId, String locationId) throws Exception {
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Namespace namespace : client.listNamespaces(parent).iterateAll()) {
        System.out.println("Namespace: " + namespace.getName());
      }
    }
  }
}
// [END servicedirectory_v1beta1_registrationservice_namespaces_list]
