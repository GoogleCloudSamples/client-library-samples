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

// [START osconfig_v1_osconfigservice_patchjob_cancel]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchJobName;
import com.google.cloud.osconfig.v1.PatchJobs.CancelPatchJobRequest;
import com.google.cloud.osconfig.v1.PatchJobs.PatchJob;
import java.io.IOException;

public class CancelPatchJob {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String patchJobId = "example-patch-job-id";
    cancelPatchJob(projectId, patchJobId);
  }

  public static void cancelPatchJob(String projectId, String patchJobId) throws IOException {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String name = PatchJobName.of(projectId, patchJobId).toString();
      CancelPatchJobRequest request = CancelPatchJobRequest.newBuilder().setName(name).build();
      PatchJob response = client.cancelPatchJob(request);
      System.out.printf(
          "Canceled patch job: %s with state: %s%n", response.getName(), response.getState());
    }
  }
}
// [END osconfig_v1_osconfigservice_patchjob_cancel]
