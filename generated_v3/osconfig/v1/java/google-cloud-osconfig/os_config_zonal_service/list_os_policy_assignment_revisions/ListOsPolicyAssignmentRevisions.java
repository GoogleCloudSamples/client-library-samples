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

// [START osconfig_v1_osconfigzonalservice_ospolicyassignmentrevisions_list]
import com.google.cloud.osconfig.v1.ListOSPolicyAssignmentRevisionsRequest;
import com.google.cloud.osconfig.v1.OSPolicyAssignment;
import com.google.cloud.osconfig.v1.OSPolicyAssignmentName;
import com.google.cloud.osconfig.v1.OsConfigZonalServiceClient;

public class ListOsPolicyAssignmentRevisions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String osPolicyAssignmentId = "example-os_policy_assignment_id";
    listOsPolicyAssignmentRevisions(projectId, locationId, osPolicyAssignmentId);
  }

  public static void listOsPolicyAssignmentRevisions(
      String projectId, String locationId, String osPolicyAssignmentId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String name =
          OSPolicyAssignmentName.of(projectId, locationId, osPolicyAssignmentId).toString();

      ListOSPolicyAssignmentRevisionsRequest request =
          ListOSPolicyAssignmentRevisionsRequest.newBuilder()
              .setName(name)
              .build();

      for (OSPolicyAssignment revision :
          client.listOSPolicyAssignmentRevisions(request).iterateAll()) {
        System.out.printf("Revision: %s%n", revision.getName());
      }
    }
  }
}
// [END osconfig_v1_osconfigzonalservice_ospolicyassignmentrevisions_list]
