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

// [START monitoring_v3_metricservice_metricdescriptor_create]
import com.google.api.MetricDescriptor;
import com.google.cloud.monitoring.v3.MetricServiceClient;

public class CreateMetricDescriptor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    createMetricDescriptor(projectId);
  }

  public static void createMetricDescriptor(String projectId) throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = "projects/" + projectId;
      MetricDescriptor metricDescriptor =
          MetricDescriptor.newBuilder()
              .setType("custom.googleapis.com/sample_metric")
              .setMetricKind(MetricDescriptor.MetricKind.GAUGE)
              .setValueType(MetricDescriptor.ValueType.INT64)
              .setDescription("An example custom metric descriptor.")
              .setDisplayName("Sample Metric")
              .build();

      MetricDescriptor response = client.createMetricDescriptor(name, metricDescriptor);
      System.out.println("Created metric descriptor: " + response.getName());
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptor_create]
