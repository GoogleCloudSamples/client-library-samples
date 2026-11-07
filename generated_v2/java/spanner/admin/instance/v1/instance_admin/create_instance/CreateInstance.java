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

package com.google.cloud.spanner.v1;

// [START spanner_v1_instanceadmin_instance_create]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.spanner.admin.instance.v1.Instance;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String instanceId = "example-instance_id";
    String instanceConfigId = "example-instance_config_id";
    createInstance(projectId, instanceId, instanceConfigId);
  }

  public static void createInstance(String projectId, String instanceId, String instanceConfigId)
      throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String parent = String.format("projects/%s", projectId);
      Instance instance =
          Instance.newBuilder()
              .setConfig(
                  String.format("projects/%s/instanceConfigs/%s", projectId, instanceConfigId))
              .setDisplayName("Test Spanner Instance")
              .setNodeCount(1)
              .build();

      // Wait for the long-running operation to complete.
      Instance createdInstance = client.createInstanceAsync(parent, instanceId, instance).get();
      System.out.println("Created instance: " + createdInstance.getName());
    }
  }
}
// [END spanner_v1_instanceadmin_instance_create]
