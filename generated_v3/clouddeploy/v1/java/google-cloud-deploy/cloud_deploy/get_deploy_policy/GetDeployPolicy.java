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

package com.google.cloud.clouddeploy.v1;

// [START clouddeploy_v1_clouddeploy_deploypolicy_get]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeployPolicy;
import com.google.cloud.deploy.v1.DeployPolicyName;
import java.io.IOException;

public class GetDeployPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String deployPolicyId = "example-deploy-policy-id";
    String locationId = "example-location-id";
    getDeployPolicy(projectId, deployPolicyId, locationId);
  }

  public static void getDeployPolicy(String projectId, String deployPolicyId, String locationId)
      throws IOException {
    // Initialize client that will be closed when the try-with-resources block exits.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name = DeployPolicyName.of(projectId, locationId, deployPolicyId).toString();
      DeployPolicy response = client.getDeployPolicy(name);
      System.out.println("Retrieved Deploy Policy: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_deploypolicy_get]
