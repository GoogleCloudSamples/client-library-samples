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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]
import com.google.cloud.dataproc.v1.AutoscalingPolicy;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceClient;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceSettings;

public class GetAutoscalingPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String regionId = "example-region-id";
    String policyId = "example-policy-id";
    getAutoscalingPolicy(projectId, regionId, policyId);
  }

  public static void getAutoscalingPolicy(String projectId, String regionId, String policyId)
      throws Exception {
    AutoscalingPolicyServiceSettings settings =
        AutoscalingPolicyServiceSettings.newBuilder()
            .setEndpoint(String.format("%s-dataproc.googleapis.com:443", regionId))
            .build();

    try (AutoscalingPolicyServiceClient client = AutoscalingPolicyServiceClient.create(settings)) {
      String name =
          String.format(
              "projects/%s/regions/%s/autoscalingPolicies/%s", projectId, regionId, policyId);
      AutoscalingPolicy response = client.getAutoscalingPolicy(name);
      System.out.println("Autoscaling policy retrieved: " + response.getName());
    }
  }
}
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]
