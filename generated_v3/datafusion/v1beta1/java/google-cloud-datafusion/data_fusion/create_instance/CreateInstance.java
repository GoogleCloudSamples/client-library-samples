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

package com.google.cloud.datafusion.v1beta1;

// [START datafusion_v1beta1_datafusion_instance_create]
import com.google.cloud.datafusion.v1beta1.DataFusionClient;
import com.google.cloud.datafusion.v1beta1.Instance;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateInstance {

  public static void main(String[] args) throws Exception {
    String projectId = args.length > 0 ? args[0] : "example-project-id";
    String locationId = args.length > 1 ? args[1] : "example-location-id";
    String instanceId = args.length > 2 ? args[2] : "example-instance-id";
    createInstance(projectId, locationId, instanceId);
  }

  public static void createInstance(String projectId, String locationId, String instanceId)
      throws Exception {
    try (DataFusionClient client = DataFusionClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Instance instance = Instance.newBuilder().setType(Instance.Type.BASIC).build();

      try {
        // Wait for instance creation with a timeout because provisioning takes up to 30 minutes.
        Instance response =
            client.createInstanceAsync(parent, instance, instanceId).get(60, TimeUnit.SECONDS);
        System.out.printf("Created instance: %s%n", response.getName());
      } catch (TimeoutException e) {
        System.out.println(
            "Instance creation is in progress. Data Fusion instances can take up to 30 minutes to create.");
      }
    }
  }
}
// [END datafusion_v1beta1_datafusion_instance_create]
