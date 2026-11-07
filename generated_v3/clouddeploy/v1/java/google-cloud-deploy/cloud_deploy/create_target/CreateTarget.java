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

// [START clouddeploy_v1_clouddeploy_target_create]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.CloudRunLocation;
import com.google.cloud.deploy.v1.LocationName;
import com.google.cloud.deploy.v1.Target;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateTarget {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String targetId = "example-target_id";
    String locationId = "example-location_id";
    createTarget(projectId, targetId, locationId);
  }

  public static void createTarget(String projectId, String targetId, String locationId)
      throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Target target =
          Target.newBuilder()
              .setDescription("Cloud Run deployment target")
              .setRun(
                  CloudRunLocation.newBuilder()
                      .setLocation(String.format("projects/%s/locations/%s", projectId, locationId))
                      .build())
              .build();

      // CreateTarget is a long-running operation; wait for it to complete.
      Target response = client.createTargetAsync(parent, target, targetId).get(5, TimeUnit.MINUTES);
      System.out.println("Target created: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_target_create]
