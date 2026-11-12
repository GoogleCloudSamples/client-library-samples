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

// [START clouddeploy_v1_clouddeploy_deliverypipelines_list]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.DeliveryPipeline;
import com.google.cloud.deploy.v1.LocationName;
import java.io.IOException;

public class ListDeliveryPipelines {

  public static void main(String[] args) throws IOException {
    if (args.length > 0) {
      String projectId = args[0];
      listDeliveryPipelines(projectId);
    }
  }

  public static void listDeliveryPipelines(String projectId) throws IOException {
    // Instantiates a client
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String locationName = "us-central1";
      String parent = LocationName.of(projectId, locationName).toString();

      // Retrieves and prints delivery pipelines in the specified location
      for (DeliveryPipeline pipeline : client.listDeliveryPipelines(parent).iterateAll()) {
        System.out.println("Found delivery pipeline: " + pipeline.getName());
      }
    }
  }
}
// [END clouddeploy_v1_clouddeploy_deliverypipelines_list]
