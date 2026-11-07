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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_create]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeliveryPipeline;
import com.google.cloud.deploy.v1.LocationName;
import java.util.concurrent.TimeUnit;

public class CreateDeliveryPipeline {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    String locationId = "example-location-id";
    createDeliveryPipeline(projectId, deliveryPipelineId, locationId);
  }

  public static void createDeliveryPipeline(
      String projectId, String deliveryPipelineId, String locationId) throws Exception {
    // Initialize client that sends requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      DeliveryPipeline deliveryPipeline =
          DeliveryPipeline.newBuilder()
              .setDescription("Sample delivery pipeline")
              .build();

      // Initiate the long-running operation to create the delivery pipeline and wait for completion.
      DeliveryPipeline response =
          client
              .createDeliveryPipelineAsync(parent, deliveryPipeline, deliveryPipelineId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created delivery pipeline: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_deliverypipeline_create]
