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

// [START cloudquotas_v1_cloudquotas_quotapreferences_list]
import com.google.api.cloudquotas.v1.CloudQuotasClient;
import com.google.api.cloudquotas.v1.QuotaPreference;

public class ListQuotaPreferences {

  public static void main(String[] args) throws Exception {
    listQuotaPreferences();
  }

  public static void listQuotaPreferences() throws Exception {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String parent = String.format("projects/%s/locations/global", projectId);

    try (CloudQuotasClient client = CloudQuotasClient.create()) {
      for (QuotaPreference quotaPreference : client.listQuotaPreferences(parent).iterateAll()) {
        System.out.printf("Quota preference: %s%n", quotaPreference.getName());
      }
    }
  }
}
// [END cloudquotas_v1_cloudquotas_quotapreferences_list]
