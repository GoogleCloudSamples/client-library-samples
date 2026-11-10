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

package com.google.cloud.cloudquotas.v1;

// [START cloudquotas_v1_cloudquotas_quotainfos_list]
import com.google.api.cloudquotas.v1.CloudQuotasClient;
import com.google.api.cloudquotas.v1.QuotaInfo;
import java.io.IOException;

public class ListQuotaInfos {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String serviceId = "compute.googleapis.com";
    listQuotaInfos(projectId, locationId, serviceId);
  }

  public static void listQuotaInfos(String projectId, String locationId, String serviceId)
      throws IOException {
    try (CloudQuotasClient client = CloudQuotasClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/services/%s", projectId, locationId, serviceId);
      for (QuotaInfo quotaInfo : client.listQuotaInfos(parent).iterateAll()) {
        System.out.printf("Quota info: %s%n", quotaInfo.getName());
      }
    }
  }
}
// [END cloudquotas_v1_cloudquotas_quotainfos_list]
