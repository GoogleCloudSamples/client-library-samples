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

package com.google.cloud.dataproc.v1;

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
import com.google.cloud.dataproc.v1.AutoscalingPolicy;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceClient;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceSettings;
import com.google.cloud.dataproc.v1.BasicAutoscalingAlgorithm;
import com.google.cloud.dataproc.v1.BasicYarnAutoscalingConfig;
import com.google.cloud.dataproc.v1.InstanceGroupAutoscalingPolicyConfig;
import com.google.protobuf.Duration;
import java.io.IOException;

public class CreateAutoscalingPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String autoscalingPolicyId = "example-autoscaling-policy-id";
    createAutoscalingPolicy(projectId, locationId, autoscalingPolicyId);
  }

  public static void createAutoscalingPolicy(
      String projectId, String locationId, String autoscalingPolicyId) throws IOException {
    // Configure regional endpoint required by Dataproc for regional requests.
    AutoscalingPolicyServiceSettings settings =
        AutoscalingPolicyServiceSettings.newBuilder()
            .setEndpoint(String.format("%s-dataproc.googleapis.com:443", locationId))
            .build();

    try (AutoscalingPolicyServiceClient client = AutoscalingPolicyServiceClient.create(settings)) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      BasicYarnAutoscalingConfig yarnConfig =
          BasicYarnAutoscalingConfig.newBuilder()
              .setGracefulDecommissionTimeout(Duration.newBuilder().setSeconds(3600).build())
              .setScaleUpFactor(0.5)
              .setScaleDownFactor(0.5)
              .build();

      BasicAutoscalingAlgorithm basicAlgorithm =
          BasicAutoscalingAlgorithm.newBuilder()
              .setYarnConfig(yarnConfig)
              .build();

      InstanceGroupAutoscalingPolicyConfig workerConfig =
          InstanceGroupAutoscalingPolicyConfig.newBuilder()
              .setMinInstances(2)
              .setMaxInstances(10)
              .build();

      AutoscalingPolicy policy =
          AutoscalingPolicy.newBuilder()
              .setId(autoscalingPolicyId)
              .setWorkerConfig(workerConfig)
              .setBasicAlgorithm(basicAlgorithm)
              .build();

      AutoscalingPolicy response = client.createAutoscalingPolicy(parent, policy);
      System.out.println("Created autoscaling policy: " + response.getName());
    }
  }
}
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
