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

// [START clouddeploy_v1_clouddeploy_target_update]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.Target;
import com.google.cloud.deploy.v1.TargetName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateTarget {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String targetId = "example-target-id";
    updateTarget(projectId, locationId, targetId);
  }

  public static void updateTarget(String projectId, String locationId, String targetId)
      throws Exception {
    // Initialize the Cloud Deploy client.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Target target =
          Target.newBuilder()
              .setName(TargetName.of(projectId, locationId, targetId).toString())
              .setDescription("Updated target description")
              .build();

      // Initiate the long-running operation to update the target and wait for completion.
      Target response = client.updateTargetAsync(target, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Target updated successfully: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_target_update]
