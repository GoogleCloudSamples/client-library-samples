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

// [START securitycentermanagement_v1_securitycentermanagement_securitycenterservices_list]
import com.google.cloud.securitycentermanagement.v1.SecurityCenterManagementClient;
import com.google.cloud.securitycentermanagement.v1.SecurityCenterService;
import java.io.IOException;

public class ListSecurityCenterServices {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listSecurityCenterServices(projectId, locationId);
  }

  public static void listSecurityCenterServices(String projectId, String locationId)
      throws Exception {
    try (SecurityCenterManagementClient client = SecurityCenterManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (SecurityCenterService service : client.listSecurityCenterServices(parent).iterateAll()) {
        System.out.printf("Service name: %s%n", service.getName());
        System.out.printf("Intended enablement state: %s%n", service.getIntendedEnablementState());
        System.out.printf("Effective enablement state: %s%n", service.getEffectiveEnablementState());
      }
    }
  }
}
// [END securitycentermanagement_v1_securitycentermanagement_securitycenterservices_list]
