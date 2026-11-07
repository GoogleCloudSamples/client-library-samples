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

// [START securitycentermanagement_v1_securitycentermanagement_securitycenterservice_get]
import com.google.cloud.securitycentermanagement.v1.GetSecurityCenterServiceRequest;
import com.google.cloud.securitycentermanagement.v1.SecurityCenterManagementClient;
import com.google.cloud.securitycentermanagement.v1.SecurityCenterService;

public class GetSecurityCenterService {

  public static void main(String[] args) throws Exception {
    String securityCenterServiceId = "example-security_center_service_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    getSecurityCenterService(securityCenterServiceId, projectId, locationId);
  }

  public static void getSecurityCenterService(
      String securityCenterServiceId, String projectId, String locationId) throws Exception {
    try (SecurityCenterManagementClient client = SecurityCenterManagementClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/securityCenterServices/%s",
              projectId, locationId, securityCenterServiceId);

      GetSecurityCenterServiceRequest request =
          GetSecurityCenterServiceRequest.newBuilder().setName(name).build();

      SecurityCenterService response = client.getSecurityCenterService(request);

      System.out.println("Service name: " + response.getName());
      System.out.println("Intended enablement state: " + response.getIntendedEnablementState());
      System.out.println("Effective enablement state: " + response.getEffectiveEnablementState());
    }
  }
}
// [END securitycentermanagement_v1_securitycentermanagement_securitycenterservice_get]
