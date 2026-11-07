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

// [START clouddeploy_v1_clouddeploy_target_get]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.Target;
import com.google.cloud.deploy.v1.TargetName;
import java.io.IOException;

public class GetTarget {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String targetId = "example-target-id";
    getTarget(projectId, locationId, targetId);
  }

  public static void getTarget(String projectId, String locationId, String targetId)
      throws IOException {
    // Initialize the client to send requests.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name = TargetName.of(projectId, locationId, targetId).toString();

      Target response = client.getTarget(name);

      System.out.println("Retrieved Target: " + response.getName());
      System.out.println("Target description: " + response.getDescription());
      System.out.println("Target require approval: " + response.getRequireApproval());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_target_get]
