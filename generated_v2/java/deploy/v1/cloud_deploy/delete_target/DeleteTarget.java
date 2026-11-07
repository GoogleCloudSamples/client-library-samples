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

// [START clouddeploy_v1_clouddeploy_target_delete]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.TargetName;
import java.util.concurrent.TimeUnit;

public class DeleteTarget {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String targetId = "example-target-id";
    String locationId = "example-location-id";
    deleteTarget(projectId, targetId, locationId);
  }

  public static void deleteTarget(String projectId, String targetId, String locationId)
      throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name = TargetName.of(projectId, locationId, targetId).toString();
      client.deleteTargetAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted target: " + name);
    }
  }
}
// [END clouddeploy_v1_clouddeploy_target_delete]
