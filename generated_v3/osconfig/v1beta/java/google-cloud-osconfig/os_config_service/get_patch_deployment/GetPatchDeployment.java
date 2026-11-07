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

// [START osconfig_v1beta_osconfigservice_patchdeployment_get]
import com.google.cloud.osconfig.v1beta.OsConfigServiceClient;
import com.google.cloud.osconfig.v1beta.PatchDeploymentName;
import com.google.cloud.osconfig.v1beta.PatchDeployments.GetPatchDeploymentRequest;
import com.google.cloud.osconfig.v1beta.PatchDeployments.PatchDeployment;

public class GetPatchDeployment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String patchDeploymentId = "example-patch-deployment-id";
    getPatchDeployment(projectId, patchDeploymentId);
  }

  public static void getPatchDeployment(String projectId, String patchDeploymentId)
      throws Exception {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String name = PatchDeploymentName.of(projectId, patchDeploymentId).toString();

      GetPatchDeploymentRequest request =
          GetPatchDeploymentRequest.newBuilder().setName(name).build();

      PatchDeployment response = client.getPatchDeployment(request);
      System.out.println("Retrieved patch deployment: " + response.getName());
    }
  }
}
// [END osconfig_v1beta_osconfigservice_patchdeployment_get]
