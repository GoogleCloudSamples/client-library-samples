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

// [START serviceusage_v1beta1_serviceusage_adminoverrides_list]
import com.google.api.serviceusage.v1beta1.ListAdminOverridesRequest;
import com.google.api.serviceusage.v1beta1.QuotaOverride;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.io.IOException;

public class ListAdminOverrides {

  public static void main(String[] args) throws Exception {
    // The parent resource name is server-generated and obtained from consumer quota metrics.
    String parent =
        "projects/example-project-id/services/compute.googleapis.com/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion";
    listAdminOverrides(parent);
  }

  public static void listAdminOverrides(String parent) throws Exception {
    // Initialize the Service Usage client with Application Default Credentials.
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      ListAdminOverridesRequest request =
          ListAdminOverridesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (QuotaOverride override : client.listAdminOverrides(request).iterateAll()) {
        System.out.printf(
            "Name: %s, Metric: %s, Override value: %d%n",
            override.getName(), override.getMetric(), override.getOverrideValue());
      }
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_adminoverrides_list]
