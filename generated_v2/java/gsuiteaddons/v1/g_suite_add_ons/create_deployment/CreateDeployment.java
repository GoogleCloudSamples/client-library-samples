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

// [START gsuiteaddons_v1_gsuiteaddons_deployment_create]
import com.google.apps.script.type.CommonAddOnManifest;
import com.google.cloud.gsuiteaddons.v1.AddOns;
import com.google.cloud.gsuiteaddons.v1.Deployment;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import java.io.IOException;

public class CreateDeployment {

  public static void main(String[] args) throws IOException {
    String deploymentId = "example-deployment-id";
    String projectId = "example-project-id";
    createDeployment(deploymentId, projectId);
  }

  public static void createDeployment(String deploymentId, String projectId) throws IOException {
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String parent = String.format("projects/%s", projectId);

      CommonAddOnManifest commonManifest =
          CommonAddOnManifest.newBuilder()
              .setName("Example Add-on")
              .setLogoUrl("https://example.com/logo.png")
              .build();

      AddOns addOns = AddOns.newBuilder().setCommon(commonManifest).build();

      Deployment deployment =
          Deployment.newBuilder()
              .addOauthScopes("https://www.googleapis.com/auth/calendar.addons.execute")
              .setAddOns(addOns)
              .build();

      Deployment response = client.createDeployment(parent, deployment, deploymentId);
      System.out.println("Created deployment: " + response.getName());
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_deployment_create]
