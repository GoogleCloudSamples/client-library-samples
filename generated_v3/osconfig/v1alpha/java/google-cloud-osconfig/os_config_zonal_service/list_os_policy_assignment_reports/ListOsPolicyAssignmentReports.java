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

// [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.osconfig.v1alpha.InstanceOSPolicyAssignmentName;
import com.google.cloud.osconfig.v1alpha.OSPolicyAssignmentReport;
import com.google.cloud.osconfig.v1alpha.OsConfigZonalServiceClient;
import java.io.IOException;

public class ListOsPolicyAssignmentReports {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    listOsPolicyAssignmentReports(projectId);
  }

  public static void listOsPolicyAssignmentReports(String projectId) throws IOException {
    // Initialize client that manages OS Config zonal services.
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String location = "us-central1-a";
      // Use '-' as a wildcard to read across all instances and assignments.
      String instanceId = "-";
      String assignmentId = "-";
      String parent =
          InstanceOSPolicyAssignmentName.of(projectId, location, instanceId, assignmentId)
              .toString();

      try {
        for (OSPolicyAssignmentReport report :
            client.listOSPolicyAssignmentReports(parent).iterateAll()) {
          System.out.println("OS policy assignment report: " + report.getName());
        }
      } catch (NotFoundException e) {
        System.out.println("Resource not found: " + e.getMessage());
      }
    }
  }
}
// [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
