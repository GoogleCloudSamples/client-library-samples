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

package com.google.cloud.osconfig.v1;

// [START osconfig_v1_osconfigzonalservice_ospolicyassignment_get]
import com.google.cloud.osconfig.v1.GetOSPolicyAssignmentRequest;
import com.google.cloud.osconfig.v1.OSPolicyAssignment;
import com.google.cloud.osconfig.v1.OSPolicyAssignmentName;
import com.google.cloud.osconfig.v1.OsConfigZonalServiceClient;

public class GetOsPolicyAssignment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String osPolicyAssignmentId = "example-os_policy_assignment_id";
    getOsPolicyAssignment(projectId, locationId, osPolicyAssignmentId);
  }

  public static void getOsPolicyAssignment(
      String projectId, String locationId, String osPolicyAssignmentId) throws Exception {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String name =
          OSPolicyAssignmentName.of(projectId, locationId, osPolicyAssignmentId).toString();
      GetOSPolicyAssignmentRequest request =
          GetOSPolicyAssignmentRequest.newBuilder().setName(name).build();

      OSPolicyAssignment response = client.getOSPolicyAssignment(request);
      System.out.println("OS Policy Assignment Name: " + response.getName());
      System.out.println("OS Policy Assignment Description: " + response.getDescription());
    }
  }
}
// [END osconfig_v1_osconfigzonalservice_ospolicyassignment_get]
