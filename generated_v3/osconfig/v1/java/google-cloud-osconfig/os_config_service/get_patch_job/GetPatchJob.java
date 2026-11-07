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

// [START osconfig_v1_osconfigservice_patchjob_get]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchJobName;
import com.google.cloud.osconfig.v1.PatchJobs.GetPatchJobRequest;
import com.google.cloud.osconfig.v1.PatchJobs.PatchJob;

public class GetPatchJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String patchJobId = "example-patch_job_id";
    getPatchJob(projectId, patchJobId);
  }

  public static void getPatchJob(String projectId, String patchJobId) throws Exception {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String name = PatchJobName.of(projectId, patchJobId).toString();
      GetPatchJobRequest request = GetPatchJobRequest.newBuilder().setName(name).build();

      PatchJob response = client.getPatchJob(request);
      System.out.println("Patch job name: " + response.getName());
      System.out.println("Patch job state: " + response.getState());
    }
  }
}
// [END osconfig_v1_osconfigservice_patchjob_get]
