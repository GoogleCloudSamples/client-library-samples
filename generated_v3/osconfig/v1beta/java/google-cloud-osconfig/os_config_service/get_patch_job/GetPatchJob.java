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

// [START osconfig_v1beta_osconfigservice_patchjob_get]
import com.google.cloud.osconfig.v1beta.OsConfigServiceClient;
import com.google.cloud.osconfig.v1beta.PatchJobs.GetPatchJobRequest;
import com.google.cloud.osconfig.v1beta.PatchJobs.PatchJob;
import java.io.IOException;

public class GetPatchJob {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String patchJobId = "example-patch-job-id";
    getPatchJob(projectId, patchJobId);
  }

  public static void getPatchJob(String projectId, String patchJobId) throws IOException {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String name = String.format("projects/%s/patchJobs/%s", projectId, patchJobId);
      GetPatchJobRequest request = GetPatchJobRequest.newBuilder().setName(name).build();
      PatchJob response = client.getPatchJob(request);
      System.out.println("Patch job: " + response.getName());
      System.out.println("Patch job state: " + response.getState());
    }
  }
}
// [END osconfig_v1beta_osconfigservice_patchjob_get]
