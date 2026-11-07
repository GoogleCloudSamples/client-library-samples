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

package com.google.cloud.osconfig.v1alpha;

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_get]
import com.google.cloud.osconfig.v1alpha.GetOSPolicyAssignmentRequest;
import com.google.cloud.osconfig.v1alpha.OSPolicyAssignment;
import com.google.cloud.osconfig.v1alpha.OsConfigZonalServiceClient;
import java.io.IOException;

public class GetOsPolicyAssignment {

  public static void getOsPolicyAssignment(
      String projectId, String locationId, String osPolicyAssignmentId, String revisionId)
      throws IOException {
    // Initialize the client once; reuse for multiple requests.
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      // Construct the OS policy assignment resource name, optionally targeting a revision.
      String name =
          (revisionId == null || revisionId.isEmpty())
              ? String.format(
                  "projects/%s/locations/%s/osPolicyAssignments/%s",
                  projectId, locationId, osPolicyAssignmentId)
              : String.format(
                  "projects/%s/locations/%s/osPolicyAssignments/%s@%s",
                  projectId, locationId, osPolicyAssignmentId, revisionId);

      GetOSPolicyAssignmentRequest request =
          GetOSPolicyAssignmentRequest.newBuilder().setName(name).build();

      OSPolicyAssignment response = client.getOSPolicyAssignment(request);

      System.out.printf("OS Policy Assignment Name: %s%n", response.getName());
      System.out.printf("Revision ID: %s%n", response.getRevisionId());
      System.out.printf("Description: %s%n", response.getDescription());
      System.out.printf("Rollout State: %s%n", response.getRolloutState());
    }
  }
}
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_get]
