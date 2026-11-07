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

// [START serviceusage_v1beta1_serviceusage_consumeroverrides_list]
import com.google.api.serviceusage.v1beta1.ListConsumerOverridesRequest;
import com.google.api.serviceusage.v1beta1.QuotaOverride;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.io.IOException;

public class ListConsumerOverrides {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String serviceId = "example-service-id";
    String consumerQuotaMetricId = "example-consumer-quota-metric-id";
    String limitId = "example-limit-id";
    listConsumerOverrides(projectId, serviceId, consumerQuotaMetricId, limitId);
  }

  public static void listConsumerOverrides(
      String projectId, String serviceId, String consumerQuotaMetricId, String limitId)
      throws IOException {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String parent =
          String.format(
              "projects/%s/services/%s/consumerQuotaMetrics/%s/limits/%s",
              projectId, serviceId, consumerQuotaMetricId, limitId);

      ListConsumerOverridesRequest request =
          ListConsumerOverridesRequest.newBuilder().setParent(parent).build();

      for (QuotaOverride override : client.listConsumerOverrides(request).iterateAll()) {
        System.out.println("Override name: " + override.getName());
        System.out.println("Override value: " + override.getOverrideValue());
        System.out.println("Metric: " + override.getMetric());
        System.out.println("Unit: " + override.getUnit());
      }
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_consumeroverrides_list]
