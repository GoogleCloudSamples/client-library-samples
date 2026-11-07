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

package com.google.cloud.gsuiteaddons.v1;

// [START gsuiteaddons_v1_gsuiteaddons_replace_deployment]
import com.google.apps.script.type.CommonAddOnManifest;
import com.google.cloud.gsuiteaddons.v1.AddOns;
import com.google.cloud.gsuiteaddons.v1.Deployment;
import com.google.cloud.gsuiteaddons.v1.DeploymentName;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import com.google.cloud.gsuiteaddons.v1.ReplaceDeploymentRequest;

public class ReplaceDeployment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String deploymentId = "example-deployment-id";
    replaceDeployment(projectId, deploymentId);
  }

  public static void replaceDeployment(String projectId, String deploymentId) throws Exception {
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      DeploymentName deploymentName = DeploymentName.of(projectId, deploymentId);
      // Retrieve the existing deployment to preserve its current state and etag.
      Deployment existingDeployment = client.getDeployment(deploymentName);

      CommonAddOnManifest commonManifest =
          CommonAddOnManifest.newBuilder()
              .setName("Updated Example Add-on")
              .setLogoUrl("https://example.com/logo.png")
              .build();
      AddOns addOns = AddOns.newBuilder().setCommon(commonManifest).build();

      // Update mutable fields while retaining the resource name and etag.
      Deployment deployment =
          existingDeployment.toBuilder()
              .setAddOns(addOns)
              .build();

      ReplaceDeploymentRequest request =
          ReplaceDeploymentRequest.newBuilder()
              .setDeployment(deployment)
              .build();

      Deployment response = client.replaceDeployment(request);
      System.out.println("Replaced deployment: " + response.getName());
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_replace_deployment]
