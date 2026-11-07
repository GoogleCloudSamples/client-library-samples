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

// [START cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_update]
import com.google.api.cloudquotas.v1beta.QuotaAdjusterSettings;
import com.google.api.cloudquotas.v1beta.QuotaAdjusterSettingsManagerClient;
import com.google.protobuf.FieldMask;

public class UpdateQuotaAdjusterSettings {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Quota Adjuster Settings service currently only supports "global"
    String locationId = "global";
    updateQuotaAdjusterSettings(projectId, locationId);
  }

  public static void updateQuotaAdjusterSettings(String projectId, String locationId)
      throws Exception {
    try (QuotaAdjusterSettingsManagerClient client = QuotaAdjusterSettingsManagerClient.create()) {
      String settingsName =
          String.format("projects/%s/locations/%s/quotaAdjusterSettings", projectId, locationId);

      QuotaAdjusterSettings quotaAdjusterSettings =
          QuotaAdjusterSettings.newBuilder()
              .setName(settingsName)
              .setEnablement(QuotaAdjusterSettings.Enablement.ENABLED)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("enablement").build();

      QuotaAdjusterSettings response =
          client.updateQuotaAdjusterSettings(quotaAdjusterSettings, updateMask);

      System.out.println("Updated quota adjuster settings: " + response.getName());
      System.out.println("Enablement status: " + response.getEnablement());
    }
  }
}
// [END cloudquotas_v1beta_quotaadjustersettingsmanager_quotaadjustersettings_update]
