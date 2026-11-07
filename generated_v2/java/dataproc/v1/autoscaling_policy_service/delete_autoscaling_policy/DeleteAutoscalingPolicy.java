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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
import com.google.cloud.dataproc.v1.AutoscalingPolicyName;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceClient;
import com.google.cloud.dataproc.v1.AutoscalingPolicyServiceSettings;
import java.io.IOException;

public class DeleteAutoscalingPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String autoscalingPolicyId = "example-autoscaling-policy-id";
    deleteAutoscalingPolicy(projectId, locationId, autoscalingPolicyId);
  }

  public static void deleteAutoscalingPolicy(
      String projectId, String locationId, String autoscalingPolicyId) throws IOException {
    // Configure regional endpoint required for Dataproc regional resources.
    AutoscalingPolicyServiceSettings settings =
        AutoscalingPolicyServiceSettings.newBuilder()
            .setEndpoint(String.format("%s-dataproc.googleapis.com:443", locationId))
            .build();

    // Initialize client using Application Default Credentials (ADC).
    try (AutoscalingPolicyServiceClient client = AutoscalingPolicyServiceClient.create(settings)) {
      String name =
          AutoscalingPolicyName.ofProjectLocationAutoscalingPolicyName(
                  projectId, locationId, autoscalingPolicyId)
              .toString();

      client.deleteAutoscalingPolicy(name);
      System.out.println("Successfully deleted autoscaling policy: " + name);
    }
  }
}
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
