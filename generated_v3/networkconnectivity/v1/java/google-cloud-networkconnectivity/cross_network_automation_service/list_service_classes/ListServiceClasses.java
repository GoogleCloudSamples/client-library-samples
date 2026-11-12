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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceclasses_list]
import com.google.cloud.networkconnectivity.v1.CrossNetworkAutomationServiceClient;
import com.google.cloud.networkconnectivity.v1.ListServiceClassesRequest;
import com.google.cloud.networkconnectivity.v1.ServiceClass;

public class ListServiceClasses {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listServiceClasses(projectId, locationId);
  }

  public static void listServiceClasses(String projectId, String locationId) throws Exception {
    try (CrossNetworkAutomationServiceClient client =
        CrossNetworkAutomationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListServiceClassesRequest request =
          ListServiceClassesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (ServiceClass serviceClass : client.listServiceClasses(request).iterateAll()) {
        System.out.println("Service class: " + serviceClass.getName());
      }
    }
  }
}
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceclasses_list]
