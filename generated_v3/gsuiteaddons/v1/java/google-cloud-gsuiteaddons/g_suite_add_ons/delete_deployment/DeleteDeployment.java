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

// [START gsuiteaddons_v1_gsuiteaddons_deployment_delete]
import com.google.cloud.gsuiteaddons.v1.DeleteDeploymentRequest;
import com.google.cloud.gsuiteaddons.v1.DeploymentName;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;
import java.io.IOException;

public class DeleteDeployment {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String deploymentId = "example-deployment-id";
    deleteDeployment(projectId, deploymentId);
  }

  public static void deleteDeployment(String projectId, String deploymentId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String name = DeploymentName.of(projectId, deploymentId).toString();
      DeleteDeploymentRequest request =
          DeleteDeploymentRequest.newBuilder()
              .setName(name)
              .build();

      client.deleteDeployment(request);
      System.out.printf("Deleted deployment: %s%n", name);
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_deployment_delete]
