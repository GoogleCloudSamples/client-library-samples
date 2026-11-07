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

// [START cloudquotas_v1_cloudquotas_quotapreference_get]
import com.google.api.cloudquotas.v1.CloudQuotasClient;
import com.google.api.cloudquotas.v1.QuotaPreference;

public class GetQuotaPreference {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String quotaPreferenceId = "example-quota-preference-id";
    getQuotaPreference(projectId, locationId, quotaPreferenceId);
  }

  public static void getQuotaPreference(
      String projectId, String locationId, String quotaPreferenceId) throws Exception {
    try (CloudQuotasClient client = CloudQuotasClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/quotaPreferences/%s",
              projectId, locationId, quotaPreferenceId);

      QuotaPreference response = client.getQuotaPreference(name);
      System.out.println("Quota preference retrieved: " + response.getName());
    }
  }
}
// [END cloudquotas_v1_cloudquotas_quotapreference_get]
