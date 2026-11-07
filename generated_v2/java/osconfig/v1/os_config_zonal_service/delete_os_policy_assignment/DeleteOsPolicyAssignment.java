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

// [START osconfig_v1_osconfigzonalservice_ospolicyassignment_delete]
import com.google.api.gax.rpc.UnknownException;
import com.google.cloud.osconfig.v1.DeleteOSPolicyAssignmentRequest;
import com.google.cloud.osconfig.v1.OSPolicyAssignmentName;
import com.google.cloud.osconfig.v1.OsConfigZonalServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteOsPolicyAssignment {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String osPolicyAssignmentId = "example-os-policy-assignment-id";
    deleteOsPolicyAssignment(projectId, locationId, osPolicyAssignmentId);
  }

  public static void deleteOsPolicyAssignment(
      String projectId, String locationId, String osPolicyAssignmentId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String name =
          OSPolicyAssignmentName.of(projectId, locationId, osPolicyAssignmentId).toString();

      DeleteOSPolicyAssignmentRequest request =
          DeleteOSPolicyAssignmentRequest.newBuilder().setName(name).build();

      // DeleteOSPolicyAssignment is a long-running operation.
      try {
        client.deleteOSPolicyAssignmentAsync(request).get(5, TimeUnit.MINUTES);
      } catch (ExecutionException e) {
        // The service can return an OSPolicyAssignment payload instead of Empty upon completion,
        // which triggers a response unpacking error in the client library even though the operation succeeded.
        if (!(e.getCause() instanceof UnknownException
            && e.getCause().getMessage().contains("succeeded, but encountered a problem unpacking it"))) {
          throw e;
        }
      }

      System.out.println("Deleted OS policy assignment: " + name);
    }
  }
}
// [END osconfig_v1_osconfigzonalservice_ospolicyassignment_delete]
