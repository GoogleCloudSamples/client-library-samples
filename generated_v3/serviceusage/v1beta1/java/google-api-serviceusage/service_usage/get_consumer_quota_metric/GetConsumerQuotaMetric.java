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

package com.google.cloud.serviceusage.v1beta1;

// [START serviceusage_v1beta1_serviceusage_consumerquotametric_get]
import com.google.api.serviceusage.v1beta1.ConsumerQuotaMetric;
import com.google.api.serviceusage.v1beta1.GetConsumerQuotaMetricRequest;
import com.google.api.serviceusage.v1beta1.QuotaView;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.io.IOException;

public class GetConsumerQuotaMetric {

  public static void main(String[] args) throws IOException {
    getConsumerQuotaMetric();
  }

  public static void getConsumerQuotaMetric() throws IOException {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
      if (projectId == null || projectId.isEmpty()) {
        projectId = System.getenv("PROJECT_ID");
      }
      if (projectId == null || projectId.isEmpty()) {
        projectId = "example-project-id";
      }

      String service = "compute.googleapis.com";
      String metric = "compute.googleapis.com%2Fcpus";
      String name =
          String.format(
              "projects/%s/services/%s/consumerQuotaMetrics/%s", projectId, service, metric);

      GetConsumerQuotaMetricRequest request =
          GetConsumerQuotaMetricRequest.newBuilder()
              .setName(name)
              .setView(QuotaView.FULL)
              .build();

      ConsumerQuotaMetric metricResponse = client.getConsumerQuotaMetric(request);

      System.out.println("Metric name: " + metricResponse.getName());
      System.out.println("Display name: " + metricResponse.getDisplayName());
      System.out.println("Metric type: " + metricResponse.getMetric());
      System.out.println("Unit: " + metricResponse.getUnit());
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_consumerquotametric_get]
