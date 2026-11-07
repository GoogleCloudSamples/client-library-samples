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

package com.google.cloud.securitycentermanagement.v1;

// [START securitycentermanagement_v1_securitycentermanagement_descendanteventthreatdetectioncustommodules_list]
import com.google.cloud.securitycentermanagement.v1.EventThreatDetectionCustomModule;
import com.google.cloud.securitycentermanagement.v1.ListDescendantEventThreatDetectionCustomModulesRequest;
import com.google.cloud.securitycentermanagement.v1.SecurityCenterManagementClient;

public class ListDescendantEventThreatDetectionCustomModules {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listDescendantEventThreatDetectionCustomModules(projectId, locationId);
  }

  public static void listDescendantEventThreatDetectionCustomModules(
      String projectId, String locationId) throws Exception {
    try (SecurityCenterManagementClient client = SecurityCenterManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListDescendantEventThreatDetectionCustomModulesRequest request =
          ListDescendantEventThreatDetectionCustomModulesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (EventThreatDetectionCustomModule customModule :
          client.listDescendantEventThreatDetectionCustomModules(request).iterateAll()) {
        System.out.printf(
            "Found custom module: %s (display name: %s)%n",
            customModule.getName(), customModule.getDisplayName());
      }
    }
  }
}
// [END securitycentermanagement_v1_securitycentermanagement_descendanteventthreatdetectioncustommodules_list]
