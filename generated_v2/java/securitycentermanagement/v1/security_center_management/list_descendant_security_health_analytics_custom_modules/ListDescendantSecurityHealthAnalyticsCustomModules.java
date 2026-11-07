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

// [START securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]
import com.google.cloud.securitycentermanagement.v1.SecurityCenterManagementClient;
import com.google.cloud.securitycentermanagement.v1.SecurityHealthAnalyticsCustomModule;
import java.io.IOException;

public class ListDescendantSecurityHealthAnalyticsCustomModules {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listDescendantSecurityHealthAnalyticsCustomModules(projectId, locationId);
  }

  public static void listDescendantSecurityHealthAnalyticsCustomModules(
      String projectId, String locationId) throws IOException {
    try (SecurityCenterManagementClient client = SecurityCenterManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (SecurityHealthAnalyticsCustomModule customModule
          : client.listDescendantSecurityHealthAnalyticsCustomModules(parent).iterateAll()) {
        System.out.printf("Custom module name: %s%n", customModule.getName());
        System.out.printf("Display name: %s%n", customModule.getDisplayName());
        System.out.printf("Enablement state: %s%n", customModule.getEnablementState());
      }
    }
  }
}
// [END securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]
