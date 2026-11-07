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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_update]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeliveryPipeline;
import com.google.cloud.deploy.v1.DeliveryPipelineName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateDeliveryPipeline {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String deliveryPipelineId = "example-delivery-pipeline-id";
    updateDeliveryPipeline(projectId, locationId, deliveryPipelineId);
  }

  public static void updateDeliveryPipeline(
      String projectId, String locationId, String deliveryPipelineId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // Initialize client that sends requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      DeliveryPipeline deliveryPipeline =
          DeliveryPipeline.newBuilder()
              .setName(
                  DeliveryPipelineName.of(projectId, locationId, deliveryPipelineId).toString())
              .setDescription("Updated delivery pipeline description")
              .build();

      // Initiate the asynchronous operation to update the delivery pipeline.
      DeliveryPipeline response =
          client.updateDeliveryPipelineAsync(deliveryPipeline, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated delivery pipeline: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_deliverypipeline_update]
