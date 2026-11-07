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

// [START serviceusage_v1beta1_serviceusage_consumerquotalimit_get]
import com.google.api.serviceusage.v1beta1.ConsumerQuotaLimit;
import com.google.api.serviceusage.v1beta1.GetConsumerQuotaLimitRequest;
import com.google.api.serviceusage.v1beta1.QuotaView;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;

public class GetConsumerQuotaLimit {

  public static void main(String[] args) throws Exception {
    String name =
        "projects/example-project-id/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion";
    getConsumerQuotaLimit(name);
  }

  public static void getConsumerQuotaLimit(String name) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      GetConsumerQuotaLimitRequest request =
          GetConsumerQuotaLimitRequest.newBuilder()
              .setName(name)
              .setView(QuotaView.FULL)
              .build();

      ConsumerQuotaLimit limit = client.getConsumerQuotaLimit(request);
      System.out.println("Quota limit name: " + limit.getName());
      System.out.println("Metric: " + limit.getMetric());
      System.out.println("Unit: " + limit.getUnit());
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_consumerquotalimit_get]
