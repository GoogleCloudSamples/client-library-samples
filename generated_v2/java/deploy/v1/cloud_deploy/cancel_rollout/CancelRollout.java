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

// [START clouddeploy_v1_clouddeploy_rollout_cancel]
import com.google.cloud.deploy.v1.CancelRolloutRequest;
import com.google.cloud.deploy.v1.CancelRolloutResponse;
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.RolloutName;
import java.io.IOException;

public class CancelRollout {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    String releaseId = "example-release-id";
    String rolloutId = "example-rollout-id";
    cancelRollout(projectId, locationId, deliveryPipelineId, releaseId, rolloutId);
  }

  public static void cancelRollout(
      String projectId,
      String locationId,
      String deliveryPipelineId,
      String releaseId,
      String rolloutId)
      throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name =
          RolloutName.of(projectId, locationId, deliveryPipelineId, releaseId, rolloutId).toString();

      CancelRolloutRequest request = CancelRolloutRequest.newBuilder().setName(name).build();

      CancelRolloutResponse response = client.cancelRollout(request);
      System.out.println("Cancelled rollout: " + name);
    }
  }
}
// [END clouddeploy_v1_clouddeploy_rollout_cancel]
