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

// [START serviceusage_v1beta1_serviceusage_import_consumer_overrides]
import com.google.api.serviceusage.v1beta1.ImportConsumerOverridesRequest;
import com.google.api.serviceusage.v1beta1.ImportConsumerOverridesResponse;
import com.google.api.serviceusage.v1beta1.OverrideInlineSource;
import com.google.api.serviceusage.v1beta1.QuotaOverride;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.util.concurrent.TimeUnit;

public class ImportConsumerOverrides {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String serviceId = "compute.googleapis.com";
    importConsumerOverrides(projectId, serviceId);
  }

  public static void importConsumerOverrides(String projectId, String serviceId) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String parent = String.format("projects/%s/services/%s", projectId, serviceId);

      QuotaOverride quotaOverride =
          QuotaOverride.newBuilder()
              .setMetric("compute.googleapis.com/cpus")
              .setUnit("1/{project}/{region}")
              .setOverrideValue(100L)
              .putDimensions("region", "us-central1")
              .build();

      OverrideInlineSource inlineSource =
          OverrideInlineSource.newBuilder()
              .addOverrides(quotaOverride)
              .build();

      ImportConsumerOverridesRequest request =
          ImportConsumerOverridesRequest.newBuilder()
              .setParent(parent)
              .setInlineSource(inlineSource)
              .setForce(true)
              .build();

      ImportConsumerOverridesResponse response =
          client.importConsumerOverridesAsync(request).get(3, TimeUnit.MINUTES);

      System.out.printf("Imported %d overrides for %s.%n", response.getOverridesCount(), parent);
      for (QuotaOverride override : response.getOverridesList()) {
        System.out.printf(
            "Metric: %s, Unit: %s, Value: %d%n",
            override.getMetric(), override.getUnit(), override.getOverrideValue());
      }
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_import_consumer_overrides]
