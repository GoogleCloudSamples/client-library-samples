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

// [START monitoring_v3_metricservice_metricdescriptor_delete]
import com.google.cloud.monitoring.v3.MetricServiceClient;
import com.google.monitoring.v3.MetricDescriptorName;

public class DeleteMetricDescriptor {

  public static void main(String[] args) throws Exception {
    String metricDescriptorId = "custom.googleapis.com/example-metric";
    String projectId = "example-project-id";
    deleteMetricDescriptor(metricDescriptorId, projectId);
  }

  public static void deleteMetricDescriptor(String metricDescriptorId, String projectId)
      throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = MetricDescriptorName.of(projectId, metricDescriptorId).toString();

      client.deleteMetricDescriptor(name);
      System.out.println("Deleted metric descriptor: " + name);
    }
  }
}
// [END monitoring_v3_metricservice_metricdescriptor_delete]
