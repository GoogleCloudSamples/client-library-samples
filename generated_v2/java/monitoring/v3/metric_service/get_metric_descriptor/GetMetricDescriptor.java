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

// [START monitoring_v3_metricservice_metricdescriptor_get]
import com.google.api.MetricDescriptor;
import com.google.cloud.monitoring.v3.MetricServiceClient;

public class GetMetricDescriptor {

  public static void main(String[] args) throws Exception {
    String metricDescriptorId = "example-metric_descriptor_id";
    String projectId = "example-project_id";
    getMetricDescriptor(metricDescriptorId, projectId);
  }

  public static void getMetricDescriptor(String metricDescriptorId, String projectId)
      throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name =
          String.format("projects/%s/metricDescriptors/%s", projectId, metricDescriptorId);

      MetricDescriptor response = client.getMetricDescriptor(name);

      System.out.println("Metric descriptor name: " + response.getName());
      System.out.println("Type: " + response.getType());
      System.out.println("Metric kind: " + response.getMetricKind());
      System.out.println("Value type: " + response.getValueType());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptor_get]
