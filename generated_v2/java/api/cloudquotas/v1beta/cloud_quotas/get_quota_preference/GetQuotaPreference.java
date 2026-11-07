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

package com.google.cloud.cloudquotas.v1beta;

// [START cloudquotas_v1beta_cloudquotas_quotapreference_get]
import com.google.api.cloudquotas.v1.CloudQuotasClient;
import com.google.api.cloudquotas.v1.GetQuotaPreferenceRequest;
import com.google.api.cloudquotas.v1.QuotaPreference;
import java.io.IOException;

public class GetQuotaPreference {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String quotaPreferenceId = "example-quota-preference-id";
    getQuotaPreference(projectId, locationId, quotaPreferenceId);
  }

  public static void getQuotaPreference(
      String projectId, String locationId, String quotaPreferenceId) throws IOException {
    try (CloudQuotasClient client = CloudQuotasClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/quotaPreferences/%s",
              projectId, locationId, quotaPreferenceId);

      GetQuotaPreferenceRequest request =
          GetQuotaPreferenceRequest.newBuilder().setName(name).build();

      QuotaPreference response = client.getQuotaPreference(request);
      System.out.println("Retrieved QuotaPreference: " + response.getName());
      System.out.println("Quota ID: " + response.getQuotaId());
      System.out.println("Service: " + response.getService());
    }
  }
}
// [END cloudquotas_v1beta_cloudquotas_quotapreference_get]
