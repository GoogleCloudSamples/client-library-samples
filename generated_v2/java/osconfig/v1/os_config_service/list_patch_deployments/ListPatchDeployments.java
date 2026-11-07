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

// [START osconfig_v1_osconfigservice_patchdeployments_list]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchDeployments.ListPatchDeploymentsRequest;
import com.google.cloud.osconfig.v1.PatchDeployments.PatchDeployment;
import com.google.cloud.osconfig.v1.ProjectName;
import java.io.IOException;

public class ListPatchDeployments {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listPatchDeployments(projectId);
  }

  public static void listPatchDeployments(String projectId) throws Exception {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String parent = ProjectName.of(projectId).toString();
      ListPatchDeploymentsRequest request =
          ListPatchDeploymentsRequest.newBuilder().setParent(parent).build();

      for (PatchDeployment patchDeployment : client.listPatchDeployments(request).iterateAll()) {
        System.out.println("Patch deployment: " + patchDeployment.getName());
      }
    }
  }
}
// [END osconfig_v1_osconfigservice_patchdeployments_list]
