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

// [START cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_get]
import com.google.api.cloudquotas.v1beta.QuotaAdjusterSettings;
import com.google.api.cloudquotas.v1beta.QuotaAdjusterSettingsManagerClient;
import java.io.IOException;

public class GetQuotaAdjusterSettings {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    // The Quota Adjuster Settings API requires the location to be 'global'.
    String locationId = "global";
    getQuotaAdjusterSettings(projectId, locationId);
  }

  public static void getQuotaAdjusterSettings(String projectId, String locationId)
      throws IOException {
    try (QuotaAdjusterSettingsManagerClient client = QuotaAdjusterSettingsManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/quotaAdjusterSettings", projectId, locationId);

      QuotaAdjusterSettings response = client.getQuotaAdjusterSettings(name);

      System.out.println("Quota Adjuster settings retrieved successfully:");
      System.out.println("Resource Name: " + response.getName());
      System.out.println("Enablement: " + response.getEnablement());
    }
  }
}
// [END cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_get]
