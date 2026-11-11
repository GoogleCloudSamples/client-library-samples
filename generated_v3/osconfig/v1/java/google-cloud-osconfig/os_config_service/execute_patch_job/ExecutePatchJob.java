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

// [START osconfig_v1_osconfigservice_execute_patch_job]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchJobs.ExecutePatchJobRequest;
import com.google.cloud.osconfig.v1.PatchJobs.PatchInstanceFilter;
import com.google.cloud.osconfig.v1.PatchJobs.PatchJob;
import com.google.cloud.osconfig.v1.ProjectName;
import java.io.IOException;

public class ExecutePatchJob {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    executePatchJob(projectId);
  }

  public static void executePatchJob(String projectId) throws IOException {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      PatchInstanceFilter instanceFilter =
          PatchInstanceFilter.newBuilder().setAll(true).build();
      String parent = ProjectName.of(projectId).toString();

      ExecutePatchJobRequest request =
          ExecutePatchJobRequest.newBuilder()
              .setParent(parent)
              .setInstanceFilter(instanceFilter)
              .build();

      PatchJob response = client.executePatchJob(request);
      System.out.println("Executed patch job: " + response.getName());
    }
  }
}
// [END osconfig_v1_osconfigservice_execute_patch_job]
