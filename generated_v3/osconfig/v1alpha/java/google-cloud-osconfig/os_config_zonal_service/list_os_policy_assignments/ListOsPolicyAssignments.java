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

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
import com.google.cloud.osconfig.v1alpha.LocationName;
import com.google.cloud.osconfig.v1alpha.OSPolicyAssignment;
import com.google.cloud.osconfig.v1alpha.OsConfigZonalServiceClient;
import java.io.IOException;

public class ListOsPolicyAssignments {

  public static void main(String[] args) throws Exception {
    listOsPolicyAssignments();
  }

  public static void listOsPolicyAssignments() throws Exception {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
      if (projectId == null) {
        projectId = System.getenv("PROJECT_ID");
      }
      String location = "us-central1-a";
      String parent = LocationName.of(projectId, location).toString();

      for (OSPolicyAssignment assignment : client.listOSPolicyAssignments(parent).iterateAll()) {
        System.out.println("OS policy assignment: " + assignment.getName());
      }
    }
  }
}
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
