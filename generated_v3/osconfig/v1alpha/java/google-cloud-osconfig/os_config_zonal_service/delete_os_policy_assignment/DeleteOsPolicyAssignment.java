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

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_delete]
import com.google.cloud.osconfig.v1alpha.OSPolicyAssignmentName;
import com.google.cloud.osconfig.v1alpha.OsConfigZonalServiceClient;
import java.util.concurrent.TimeUnit;

public class DeleteOsPolicyAssignment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String osPolicyAssignmentId = "example-os-policy-assignment-id";
    deleteOsPolicyAssignment(projectId, locationId, osPolicyAssignmentId);
  }

  public static void deleteOsPolicyAssignment(
      String projectId, String locationId, String osPolicyAssignmentId) throws Exception {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String name =
          OSPolicyAssignmentName.of(projectId, locationId, osPolicyAssignmentId).toString();

      // DeleteOSPolicyAssignment is a long-running operation; wait for it to complete.
      client.deleteOSPolicyAssignmentAsync(name).getPollingFuture().get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted OS policy assignment: %s%n", name);
    }
  }
}
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_delete]
