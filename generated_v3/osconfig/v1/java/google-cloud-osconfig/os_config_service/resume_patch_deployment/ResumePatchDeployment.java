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

// [START osconfig_v1_osconfigservice_resume_patch_deployment]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchDeploymentName;
import com.google.cloud.osconfig.v1.PatchDeployments.PatchDeployment;
import com.google.cloud.osconfig.v1.PatchDeployments.ResumePatchDeploymentRequest;
import java.io.IOException;

public class ResumePatchDeployment {

  public static void resumePatchDeployment(String projectId, String patchDeploymentId)
      throws IOException {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String name = PatchDeploymentName.of(projectId, patchDeploymentId).toString();
      ResumePatchDeploymentRequest request =
          ResumePatchDeploymentRequest.newBuilder().setName(name).build();

      PatchDeployment response = client.resumePatchDeployment(request);
      System.out.println("Resumed patch deployment: " + response.getName());
    }
  }
}
// [END osconfig_v1_osconfigservice_resume_patch_deployment]
