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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_alertpolicyservice_alertpolicy_create]
import com.google.cloud.monitoring.v3.AlertPolicyServiceClient;
import com.google.monitoring.v3.AlertPolicy;
import com.google.monitoring.v3.ComparisonType;
import com.google.protobuf.Duration;
import java.io.IOException;

public class CreateAlertPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    createAlertPolicy(projectId);
  }

  public static void createAlertPolicy(String projectId) throws IOException {
    try (AlertPolicyServiceClient client = AlertPolicyServiceClient.create()) {
      String name = "projects/" + projectId;

      AlertPolicy.Condition.MetricThreshold metricThreshold =
          AlertPolicy.Condition.MetricThreshold.newBuilder()
              .setFilter(
                  "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" AND"
                      + " resource.type=\"gce_instance\"")
              .setDuration(Duration.newBuilder().setSeconds(60).build())
              .setComparison(ComparisonType.COMPARISON_GT)
              .setThresholdValue(0.8)
              .build();

      AlertPolicy.Condition condition =
          AlertPolicy.Condition.newBuilder()
              .setDisplayName("CPU utilization condition")
              .setConditionThreshold(metricThreshold)
              .build();

      AlertPolicy alertPolicy =
          AlertPolicy.newBuilder()
              .setDisplayName("Sample Alert Policy")
              .setCombiner(AlertPolicy.ConditionCombinerType.AND)
              .addConditions(condition)
              .build();

      AlertPolicy response = client.createAlertPolicy(name, alertPolicy);
      System.out.println("Created alert policy: " + response.getName());
    }
  }
}
// [END monitoring_v3_alertpolicyservice_alertpolicy_create]
