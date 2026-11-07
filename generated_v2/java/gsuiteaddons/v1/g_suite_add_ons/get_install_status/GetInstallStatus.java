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

// [START gsuiteaddons_v1_gsuiteaddons_installstatus_get]
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import com.google.cloud.gsuiteaddons.v1.GetInstallStatusRequest;
import com.google.cloud.gsuiteaddons.v1.InstallStatus;
import com.google.cloud.gsuiteaddons.v1.InstallStatusName;
import java.io.IOException;

public class GetInstallStatus {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String deploymentId = "example-deployment-id";
    getInstallStatus(projectId, deploymentId);
  }

  public static void getInstallStatus(String projectId, String deploymentId) throws Exception {
    // Initialize the client that manages Google Workspace Add-ons deployments.
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String name = InstallStatusName.of(projectId, deploymentId).toString();

      GetInstallStatusRequest request = GetInstallStatusRequest.newBuilder()
          .setName(name)
          .build();

      InstallStatus response = client.getInstallStatus(request);

      System.out.println("Install status resource name: " + response.getName());
      if (response.hasInstalled()) {
        System.out.println("Installed: " + response.getInstalled().getValue());
      }
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_installstatus_get]
