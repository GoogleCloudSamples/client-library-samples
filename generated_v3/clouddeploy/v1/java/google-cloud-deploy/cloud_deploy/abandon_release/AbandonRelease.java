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

// [START clouddeploy_v1_clouddeploy_abandon_release]
import com.google.cloud.deploy.v1.AbandonReleaseRequest;
import com.google.cloud.deploy.v1.AbandonReleaseResponse;
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.ReleaseName;

public class AbandonRelease {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    String releaseId = "example-release-id";
    abandonRelease(projectId, locationId, deliveryPipelineId, releaseId);
  }

  public static void abandonRelease(
      String projectId, String locationId, String deliveryPipelineId, String releaseId)
      throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name =
          ReleaseName.of(projectId, locationId, deliveryPipelineId, releaseId).toString();

      AbandonReleaseRequest request = AbandonReleaseRequest.newBuilder().setName(name).build();

      AbandonReleaseResponse response = client.abandonRelease(request);
      System.out.println("Release abandoned successfully: " + name);
    }
  }
}
// [END clouddeploy_v1_clouddeploy_abandon_release]
