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

package com.google.cloud.osconfig.v1beta;

// [START osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]
import com.google.cloud.osconfig.v1beta.PatchJobs.ListPatchJobInstanceDetailsRequest;
import com.google.cloud.osconfig.v1beta.PatchJobs.PatchJobInstanceDetails;
import java.io.IOException;

public class ListPatchJobInstanceDetails {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String patchJobId = "example-patch-job-id";
    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      patchJobId = args[1];
    }
    listPatchJobInstanceDetails(projectId, patchJobId);
  }

  public static void listPatchJobInstanceDetails(String projectId, String patchJobId)
      throws IOException {
    // Initialize the client that sends requests.
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String parent = String.format("projects/%s/patchJobs/%s", projectId, patchJobId);
      ListPatchJobInstanceDetailsRequest request =
          ListPatchJobInstanceDetailsRequest.newBuilder().setParent(parent).build();

      for (PatchJobInstanceDetails instanceDetails :
          client.listPatchJobInstanceDetails(request).iterateAll()) {
        System.out.printf("Instance: %s%n", instanceDetails.getName());
      }
    }
  }
}
// [END osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]
