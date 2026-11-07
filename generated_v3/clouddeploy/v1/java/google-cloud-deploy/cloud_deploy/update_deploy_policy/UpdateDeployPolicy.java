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

// [START clouddeploy_v1_clouddeploy_deploypolicy_update]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeployPolicy;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateDeployPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String deployPolicyId = "example-deploy-policy-id";
    updateDeployPolicy(projectId, locationId, deployPolicyId);
  }

  public static void updateDeployPolicy(String projectId, String locationId, String deployPolicyId)
      throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      DeployPolicy deployPolicy =
          DeployPolicy.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/deployPolicies/%s",
                      projectId, locationId, deployPolicyId))
              .setDescription("Updated deploy policy description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      DeployPolicy response =
          client.updateDeployPolicyAsync(deployPolicy, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated deploy policy: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_deploypolicy_update]
