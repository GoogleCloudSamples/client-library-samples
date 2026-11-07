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

// [START monitoring_v3_servicemonitoringservice_servicelevelobjective_create]
import com.google.cloud.monitoring.v3.ServiceMonitoringServiceClient;
import com.google.monitoring.v3.CreateServiceLevelObjectiveRequest;
import com.google.monitoring.v3.RequestBasedSli;
import com.google.monitoring.v3.ServiceLevelIndicator;
import com.google.monitoring.v3.ServiceLevelObjective;
import com.google.monitoring.v3.TimeSeriesRatio;
import com.google.protobuf.Duration;
import java.io.IOException;

public class CreateServiceLevelObjective {

  public static void main(String[] args) throws IOException {
    String serviceId = "example-service-id";
    String serviceLevelObjectiveId = "example-service-level-objective-id";
    String projectId = "example-project-id";
    createServiceLevelObjective(serviceId, serviceLevelObjectiveId, projectId);
  }

  public static void createServiceLevelObjective(
      String serviceId, String serviceLevelObjectiveId, String projectId) throws IOException {
    try (ServiceMonitoringServiceClient client = ServiceMonitoringServiceClient.create()) {
      String parent = String.format("projects/%s/services/%s", projectId, serviceId);

      TimeSeriesRatio timeSeriesRatio =
          TimeSeriesRatio.newBuilder()
              .setGoodServiceFilter(
                  "metric.type=\"loadbalancing.googleapis.com/https/request_count\""
                      + " resource.type=\"https_lb_rule\" metric.label.response_code_class=\"200\"")
              .setTotalServiceFilter(
                  "metric.type=\"loadbalancing.googleapis.com/https/request_count\""
                      + " resource.type=\"https_lb_rule\"")
              .build();

      RequestBasedSli requestBasedSli =
          RequestBasedSli.newBuilder().setGoodTotalRatio(timeSeriesRatio).build();

      ServiceLevelIndicator serviceLevelIndicator =
          ServiceLevelIndicator.newBuilder().setRequestBased(requestBasedSli).build();

      Duration rollingPeriod = Duration.newBuilder().setSeconds(86400).build();

      ServiceLevelObjective serviceLevelObjective =
          ServiceLevelObjective.newBuilder()
              .setDisplayName("99% Availability SLO")
              .setGoal(0.99)
              .setRollingPeriod(rollingPeriod)
              .setServiceLevelIndicator(serviceLevelIndicator)
              .build();

      CreateServiceLevelObjectiveRequest request =
          CreateServiceLevelObjectiveRequest.newBuilder()
              .setParent(parent)
              .setServiceLevelObjectiveId(serviceLevelObjectiveId)
              .setServiceLevelObjective(serviceLevelObjective)
              .build();

      ServiceLevelObjective response = client.createServiceLevelObjective(request);
      System.out.println("Created service level objective: " + response.getName());
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_servicelevelobjective_create]
