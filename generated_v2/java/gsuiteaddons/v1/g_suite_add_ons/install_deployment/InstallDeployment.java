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

// [START gsuiteaddons_v1_gsuiteaddons_install_deployment]
import com.google.cloud.gsuiteaddons.v1.DeploymentName;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import com.google.cloud.gsuiteaddons.v1.InstallDeploymentRequest;
import java.io.IOException;

public class InstallDeployment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String deploymentId = "example-deployment_id";
    installDeployment(projectId, deploymentId);
  }

  public static void installDeployment(String projectId, String deploymentId) throws IOException {
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String name = DeploymentName.of(projectId, deploymentId).toString();
      InstallDeploymentRequest request =
          InstallDeploymentRequest.newBuilder().setName(name).build();

      client.installDeployment(request);
      System.out.printf("Installed deployment: %s%n", name);
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_install_deployment]
