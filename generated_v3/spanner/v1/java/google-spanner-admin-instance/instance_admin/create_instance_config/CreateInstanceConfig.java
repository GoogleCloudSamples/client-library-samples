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

// [START spanner_v1_instanceadmin_instanceconfig_create]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.spanner.admin.instance.v1.InstanceConfig;
import com.google.spanner.admin.instance.v1.InstanceConfigName;
import com.google.spanner.admin.instance.v1.ProjectName;
import com.google.spanner.admin.instance.v1.ReplicaInfo;
import java.util.ArrayList;
import java.util.List;

public class CreateInstanceConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String instanceConfigId = "custom-example-instance-config";
    String baseInstanceConfigId = "nam3";
    createInstanceConfig(projectId, instanceConfigId, baseInstanceConfigId);
  }

  public static void createInstanceConfig(
      String projectId, String instanceConfigId, String baseInstanceConfigId) throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String parent = ProjectName.of(projectId).toString();

      // Retrieve the base configuration to copy replicas and choose an optional replica
      String baseConfigName = InstanceConfigName.of(projectId, baseInstanceConfigId).toString();
      InstanceConfig baseConfig = client.getInstanceConfig(baseConfigName);

      List<ReplicaInfo> replicas = new ArrayList<>(baseConfig.getReplicasList());
      if (!baseConfig.getOptionalReplicasList().isEmpty()) {
        replicas.add(baseConfig.getOptionalReplicas(0));
      }

      String customConfigName = InstanceConfigName.of(projectId, instanceConfigId).toString();
      InstanceConfig instanceConfig =
          InstanceConfig.newBuilder()
              .setName(customConfigName)
              .setBaseConfig(baseConfigName)
              .setDisplayName("Example custom instance configuration")
              .addAllReplicas(replicas)
              .build();

      // Long-running operation requires waiting for completion
      InstanceConfig response =
          client.createInstanceConfigAsync(parent, instanceConfig, instanceConfigId).get();
      System.out.println("Created instance configuration: " + response.getName());
    }
  }
}
// [END spanner_v1_instanceadmin_instanceconfig_create]
